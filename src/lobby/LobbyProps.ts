import { Coordinate } from "game/Coordinate"
import { PlayerProps } from "game/PlayerProps"
import { SpaceEntityType } from "game/SpaceEntityType"

export interface LobbyProps {
  id: number
  owner: {
    id: number
    username: string
  }
  name: string
  state: string
  users: PlayerProps[]
  map: {
    planets: {
      id: number
      type: SpaceEntityType
      coordinate: Coordinate
      owner: number | null
      production: number
      units: number
      radius: number
    }[]
    settings: {
      speed: number
      width: number
      height: number
    }
  }
  batches: any[]
}