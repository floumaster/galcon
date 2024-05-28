import { makeAutoObservable } from "mobx";
import { GameState } from "./GameState";
import { SpaceEntityFactory } from "./SpaceEntityFactory";
import { Planet } from "./Planet";
import { SpaceBrigade, SpaceBrigadeProps } from "./SpaceBrigade";
import { Player } from "./Player";
import { PlayerFactory } from "./PlayerFactory";
import { GameApi } from "./api/GameApi";
import { LobbyFactory, LobbyApi, Lobby } from "./../lobby";
import { GameEventDistribution } from "./api/GameEventDistribution";
import { GameSettings } from "./GameSettings";
import { PLAYER_COLOR_PRIORITY } from "./PlayerColorPriority";
import { SpaceBrigadeSendEventResponse } from "./SpaceBrigadeSendEventResponse";
import { SpaceBrigadeCollisionEventResponse } from "./SpaceBrigadeCollisionEventResponse";
import { Coordinate } from "./Coordinate";
import { Explosion } from "./Explosion";
import { ExplosionFactory } from "./ExplosionFactory";

const LS_JWT_KEY = 'userJWT'
const LS_NAME_KEY = 'userName'

class Game {
  private _state: GameState = 'initial'
  private _userId: string | null = null
  private _userJWT: string | null = null
  private _gameApi: GameApi
  private _lobbies: Lobby[] = []
  private _lobbyApi: LobbyApi | null = null
  public lobbyOwner: string = ''
  public settings: GameSettings | any
  public planets: Planet[] = []
  public explosions: Explosion[] = []
  public spaceBrigades: SpaceBrigade[] = []
  public players: Player[] = []
  public currentPlayerName = ''
  public gameEventDistribution: GameEventDistribution | null = null
  public planetOccupationCounter = 0

  public get state() {
    return this._state
  }

  public get userId() {
    return this._userId
  }

  public async authorize(username: string) {
    this._userJWT = await this._gameApi.authorize({
      username,
    });
    this.currentPlayerName = username
    localStorage.setItem(LS_JWT_KEY, this._userJWT);
    localStorage.setItem(LS_NAME_KEY, this.currentPlayerName);
    this.onAuthorized()
  }

  public async onAuthorized() {
    if (this._userJWT)
      this._lobbyApi = new LobbyApi(this._userJWT)
    await this.fetchLobbies()
    this._state = 'lobbyList'
  }

  public async createLobby() {
    if (this._lobbyApi) {
      const lobbyFactory = new LobbyFactory()
      this._lobbies.push(lobbyFactory.createLobby((await this._lobbyApi.createLobby())))
    }
  }

  public onGameStart() {
    this._state = 'inProgress'
    localStorage.removeItem(LS_JWT_KEY);
    localStorage.removeItem(LS_NAME_KEY);
    if (this.gameEventDistribution && this.currentPlayerName === this.players[0].name) {
      this.gameEventDistribution.socket.emit('RoomStateChangeEvent', { state: 'start' });
    }
  }

  public onUserChangeReadinessState(userId: number, isReady: boolean) {
    if (this.gameEventDistribution)
      this.gameEventDistribution.socket.emit('UserReadinessChange', { userId, isReady });
  }

  public onUserReadinessChange(userId: number, isReady: boolean) {
    const player = this.players.find(player => player.id === userId)
    if (player) {
      player.isReady = isReady
    }
  }

  public get gameWinner() {
    const playersWithPlanets = this.players.filter(player => this.planets.some(planet => planet.owner === player.id))
    if (playersWithPlanets.length === 1) {
      return playersWithPlanets[0]
    }
  }

  public async joinLobby(lobbyId: number) {
    const lobby = this._lobbies.find(lobby => lobby.id === lobbyId)
    if (this._userJWT && lobby) {
      this.gameEventDistribution = new GameEventDistribution(this._userJWT, lobby.id)
      const spaceEntityFactory = new SpaceEntityFactory()
      const playerFactory = new PlayerFactory()
      this.lobbyOwner = lobby.owner.username
      this.planets.push(...lobby.map.planets.map(planet => spaceEntityFactory.createPlanet(planet)))
      this.players.push(...lobby.users.map(user => playerFactory.createPlayer(user, this.onUserChangeReadinessState)))
      this.settings = lobby.map.settings
      this._state = 'pending'
      this.gameEventDistribution.socket.on('RoomUserJoin', (event) => {
        console.log('RoomUserJoin', event);
        this.players.push(playerFactory.createPlayer({
          id: event.user.id,
          name: event.user.username,
          color: PLAYER_COLOR_PRIORITY[this.players.length],
          isReady: false,
        }, this.onUserChangeReadinessState))
      });

      this.gameEventDistribution.socket.timeout

      this.gameEventDistribution.socket.on('RoomUserLeave', (event) => {
        console.log('RoomUserLeave', event);
        this.players = this.players.filter(player => player.id !== event.user.id)
      });

      this.gameEventDistribution.socket.on('RoomStateChangeEvent', (event) => {
        console.log('RoomStateChangeEvent', event);

      });

      this.gameEventDistribution.socket.on('UserReadinessChange', (event) => {
        console.log('UserReadinessChange', event)
        this.onUserReadinessChange(event.userId, event.isReady)
      });

      this.gameEventDistribution.socket.on('PlanetsStateChange', (event) => {
        this.onPlanetsStateChange(event.planets)
      });

      this.gameEventDistribution.socket.on('PlanetOccupiedEvent', (event) => {
        console.log(event, 'PlanetOccupiedEvent')
        const explosionFactory = new ExplosionFactory()
        const targetPlanet = this.planets.find(planet => planet.id === event.planetId)
        if (targetPlanet) {
          if (this.planetOccupationCounter >= 2) {
            this.explosions.push(explosionFactory.createExplosion({
              id: targetPlanet.id,
              coordinate: targetPlanet.coordinate,
              radius: targetPlanet.radius * 1.5
            }))
            setTimeout(() => {
              this.explosions = this.explosions.filter(explosion => explosion.id !== targetPlanet.id)
            }, 2000)
          }
          this.planetOccupationCounter++
          targetPlanet.owner = event.newOwnerId
        }
      });

      this.gameEventDistribution.socket.on('BatchSendEvent', (event) => {
        console.log('BatchSendEvent', event, this.planets)
        this.onSpaceBrigadeSendEvent(event)
      });

      this.gameEventDistribution.socket.on('BatchCollisionEvent', (event) => {
        console.log('BatchCollisionEvent', event)
        this.onSpaceBrigadeCollisionEvent(event)
      });

      this.gameEventDistribution.socket.on("disconnect", (event) => {
        console.log('DISCONNECTED', event)
      });
    }

  }

  public get isGameReady() {
    return this.players.length > 1 && this.players.every(player => player.isReady)
  }

  public onPlanetsStateChange(planets: {
    id: number
    units: number
  }[]) {
    this.planets.forEach(planet => planet.units = planets.find(updatedPlanet => updatedPlanet.id === planet.id)?.units ?? planet.units)
  }


  public async fetchLobbies() {
    this._lobbyApi = new LobbyApi(this._userJWT ?? '')
    if (this._lobbyApi) {
      const lobbyFactory = new LobbyFactory()
      this._lobbies = (await this._lobbyApi.getLobbies()).map(lobbyFetched => lobbyFactory.createLobby(lobbyFetched))
    }
  }

  public get lobbies() {
    return this._lobbies
  }


  public constructor() {
    this._gameApi = new GameApi()
    const userJwt = localStorage.getItem(LS_JWT_KEY)
    const username = localStorage.getItem(LS_NAME_KEY)
    if (userJwt && username) {
      this._userJWT = userJwt
      this.currentPlayerName = username
      this.onAuthorized()
    }
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public onSpaceBrigadeCollisionEvent(event: SpaceBrigadeCollisionEventResponse) {
    this.spaceBrigades = this.spaceBrigades.filter(spaceBrigade => spaceBrigade.id !== event.batchId)
    const targetPlanet = this.planets.find(planet => planet.id === event.planetId)
    if (targetPlanet)
      targetPlanet.units = event.newPlanetUnits
  }

  public onSpaceBrigadeSendEvent(event: SpaceBrigadeSendEventResponse) {
    const spaceEntityFactory = new SpaceEntityFactory()
    const fromCoordinates = { ...this.planets.find(planet => planet.id === event.fromPlanetId)?.coordinate } as Coordinate
    const toCoordinates = { ...this.planets.find(planet => planet.id === event.toPlanetId)?.coordinate } as Coordinate
    const spaceBrigadeData: SpaceBrigadeProps = {
      id: event.id,
      type: 'SpaceBrigade',
      owner: event.ownerId,
      coordinate: {
        ...fromCoordinates
      },
      fromCoordinate: {
        ...fromCoordinates
      },
      toCoordinate: {
        ...toCoordinates
      },
      units: event.count,
    }
    this.spaceBrigades.push(spaceEntityFactory.createSpaceBrigade(spaceBrigadeData))
  }

  public sendSpaceBrigade(fromPlanet: Planet, toPlanet: Planet) {
    const spaceBrigadeData = {
      fromPlanetId: fromPlanet.id,
      toPlanetId: toPlanet.id,
      count: Math.round(fromPlanet.units / 2),
      id: fromPlanet.id * toPlanet.id,
    };
    if (this.gameEventDistribution) {
      this.gameEventDistribution.socket.emit('BatchSendEvent', spaceBrigadeData);
    }
  }

  public setState(state: GameState) {
    this._state = state
  }

  public setUserId(userId: string) {
    return this._userId = userId
  }
}

export const game = new Game()