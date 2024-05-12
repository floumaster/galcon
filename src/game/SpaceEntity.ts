import { Coordinate } from "./Coordinate"
import { SpaceEntityType } from "./SpaceEntityType"

export interface SpaceEntity {
  id: string
  type: SpaceEntityType
  owner: string | null
  coordinate: Coordinate
  units: number
}