import { Coordinate } from "game/Coordinate"
import { SpaceEntityType } from "game/SpaceEntityType"

export interface LobbyProps {
  id: string
  owner: {
    id: string
    username: string
  }
  name: string
  state: string
  users: any[]
  map: {
    planets: {
      id: string
      type: SpaceEntityType
      coordinate: Coordinate
      owner: string | null
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