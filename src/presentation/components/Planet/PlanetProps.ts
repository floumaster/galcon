import { Coordinate } from "game/Coordinate";
import { SyntheticEvent } from "react";

export interface PlanetProps {
  radius: number,
  coordinate: Coordinate
  color?: string
  spaceShipsAmount: number
  onClick?: (e: SyntheticEvent) => void
  isSelected?: boolean
}