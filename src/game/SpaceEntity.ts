import { Coordinate } from "./Coordinate"
import { SpaceEntityType } from "./SpaceEntityType"

export interface SpaceEntity {
  id: number
  type: SpaceEntityType
  owner: number | null
  coordinate: Coordinate
  units: number
}