import { Coordinate } from "game/Coordinate";

export interface PlanetProps {
  radius: number,
  coordinate: Coordinate
  color?: string
  spaceShipsAmount: number
  onClick?: () => void
  isSelected?: boolean
}