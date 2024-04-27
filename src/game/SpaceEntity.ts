import { Coordinate } from "./Coordinate"
import { SpaceEntityType } from "./SpaceEntityType"

export interface SpaceEntity {
  id: string
  type: SpaceEntityType
  ownerId?: string
  coordinate: Coordinate
  spaceShipsAmount: number
}