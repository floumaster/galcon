import { Coordinate } from "game/Coordinate";
import styled from "styled-components";

export const Image = styled.img`
  width: 40px;
  height: 40px;
  filter: invert(100%);
  z-index: 2
`

export const Background = styled.div<{ $color?: string }>`
  position: absolute;
  background-color: ${props => props.$color};
  opacity: 0.5;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  z-index: 0;
`

export const SpaceShipsNumber = styled.div<{ $color?: string }>`
  position: absolute;
  top: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  cursor: default;
  text-shadow: 0 0 5px ${props => props.$color};
  z-index: 3;
`

export const Wrapper = styled.div<{ $coordinate: Coordinate; }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 0;
  height: 0;
  border-radius: 50%;
  top: ${props => props.$coordinate.y}px;
  left: ${props => props.$coordinate.x}px;
`