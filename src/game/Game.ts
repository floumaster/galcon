import { makeAutoObservable } from "mobx";
import { GameState } from "./GameState";
import { SpaceEntityFactory } from "./SpaceEntityFactory";
import { Planet, PlanetProps } from "./Planet";
import { SpaceBrigade, SpaceBrigadeProps } from "./SpaceBrigade";
import { Player } from "./Player";
import { PlayerFactory } from "./PlayerFactory";
import { GameApi } from "./api/GameApi";
import { LobbyFactory, LobbyApi, Lobby } from "lobby";
import { GameEventDistribution } from "./api/GameEventDistribution";
import { GameSettings } from "./GameSettings";

const JTW_TOKEN_KEY = 'JTW_TOKEN_KEY'

class Game {
  private _state: GameState = 'initial'
  private _userId: string | null = null
  private _userJWT: string | null = null
  private _gameApi: GameApi
  private _lobbies: Lobby[] = []
  private _lobbyApi: LobbyApi | null = null
  public settings: GameSettings | any
  public planets: Planet[] = []
  public spaceBrigades: SpaceBrigade[] = []
  public players: Player[] = []
  public currentPlayerName = 'Monesy'
  public gameEventDistribution: GameEventDistribution | null = null

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
    localStorage.setItem(JTW_TOKEN_KEY, this._userJWT)
    await this.onAuthorized()
  }

  public async onAuthorized() {
    if (this._userJWT) {
      this._lobbyApi = new LobbyApi(this._userJWT)
      await this.fetchLobbies()
      this._state = 'lobbyList'
    }
  }

  public async createLobby() {
    if (this._lobbyApi) {
      const lobbyFactory = new LobbyFactory()
      this._lobbies.push(lobbyFactory.createLobby((await this._lobbyApi.createLobby())))
    }
  }

  public async joinLobby(lobbyId: string) {
    const lobby = this._lobbies.find(lobby => lobby.id === lobbyId)
    if (this._userJWT && lobby) {
      this.gameEventDistribution = new GameEventDistribution(this._userJWT, lobby.id)
      const spaceEntityFactory = new SpaceEntityFactory()
      this.planets.push(...lobby.map.planets.map(planet => spaceEntityFactory.createPlanet(planet)))
      this.settings = lobby.map.settings
      this._state = 'inProgress'
    }

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
    const token = localStorage.getItem(JTW_TOKEN_KEY)
    if (token) {
      this._userJWT = token
      this.onAuthorized()
    }
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public sendSpaceBrigade(fromPlanet: Planet, toPlanet: Planet) {
    const spaceEntityFactory = new SpaceEntityFactory()
    const fromCoordanate = JSON.parse(JSON.stringify(fromPlanet.coordinate))
    const toCoordinate = JSON.parse(JSON.stringify(toPlanet.coordinate))
    const spaceBrigadesMockData: SpaceBrigadeProps[] = [
      {
        id: 'asdfgsdfg',
        type: 'SpaceBrigade',
        ownerId: fromPlanet.owner,
        coordinate: fromCoordanate,
        fromCoordinate: fromCoordanate,
        toCoordinate: toCoordinate,
        spaceShipsAmount: fromPlanet.units / 2,
      },
    ]
    this.spaceBrigades = spaceBrigadesMockData.map(spaceBrigadeMockData => spaceEntityFactory.createSpaceBrigade(spaceBrigadeMockData))

  }

  public setState(state: GameState) {
    this._state = state
  }

  public setUserId(userId: string) {
    return this._userId = userId
  }
}

export const game = new Game()