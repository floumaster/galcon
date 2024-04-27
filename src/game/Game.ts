import { makeAutoObservable } from "mobx";
import { GameState } from "./GameState";
import { SpaceEntity } from "./SpaceEntity";
import { SpaceEntityFactory } from "./SpaceEntityFactory";
import { Planet, PlanetProps } from "./Planet";
import { SpaceBrigade, SpaceBrigadeProps } from "./SpaceBrigade";
import { Player } from "./Player";
import { PlayerFactory } from "./PlayerFactory";

class Game {
  private _state: GameState = 'inProgress'
  private _userId: string | null = null
  public planets: Planet[] = []
  public spaceBrigades: SpaceBrigade[] = []
  public players: Player[] = []
  public currentPlayerName = 'Monesy'

  public get state() {
    return this._state
  }

  public get userId() {
    return this._userId
  }



  public constructor() {
    const spaceEntityFactory = new SpaceEntityFactory()
    const playerFactory = new PlayerFactory()
    const planetsMockData: PlanetProps[] = [
      {
        id: 'dlgjkldfg',
        type: 'Planet',
        coordinate: {
          x: 10,
          y: 10,
        },
        radius: 150,
        spaceShipsAmount: 50,
      },
      {
        id: 'jhgkhfk',
        type: 'Planet',
        coordinate: {
          x: 34,
          y: 23,
        },
        radius: 90,
        spaceShipsAmount: 78,
      },
      {
        id: 'asdfgsdfg',
        type: 'Planet',
        ownerId: 'kjfg',
        coordinate: {
          x: 34,
          y: 23,
        },
        radius: 130,
        spaceShipsAmount: 23,
      },
      {
        id: 'xcvbxcvb',
        type: 'Planet',
        coordinate: {
          x: 15,
          y: 30,
        },
        radius: 100,
        spaceShipsAmount: 98,
      },
      {
        id: 'cFDSfc',
        type: 'Planet',
        ownerId: 'kjfg',
        coordinate: {
          x: 70,
          y: 30,
        },
        radius: 200,
        spaceShipsAmount: 34,
      },
      {
        id: 'bvm,xnbcbx',
        type: 'Planet',
        ownerId: 'ghkjghf',
        coordinate: {
          x: 50,
          y: 50,
        },
        radius: 80,
        spaceShipsAmount: 56,
      }
    ]
    const plyersMockData: Player[] = [
      {
        color: '#ff0000',
        id: 'kjfg',
        name: 'Niko',
      },
      {
        color: '#0d00ff',
        id: 'ghkjghf',
        name: 'Monesy',
      },
    ]
    this.players = plyersMockData.map(playerMockData => playerFactory.createPlayer(playerMockData))
    this.planets.push(...planetsMockData.map(planetMockData => spaceEntityFactory.createPlanet(planetMockData)))
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public sendSpaceBrigade(fromPlanet: Planet, toPlanet: Planet) {
    const spaceEntityFactory = new SpaceEntityFactory()
    const fromCoordanate = fromPlanet.coordinate
    const toCoordinate = toPlanet.coordinate
    const spaceBrigadesMockData: SpaceBrigadeProps[] = [
      {
        id: 'asdfgsdfg',
        type: 'SpaceBrigade',
        ownerId: fromPlanet.ownerId,
        coordinate: fromCoordanate,
        fromCoordinate: fromCoordanate,
        toCoordinate: toCoordinate,
        spaceShipsAmount: fromPlanet.spaceShipsAmount / 2,
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