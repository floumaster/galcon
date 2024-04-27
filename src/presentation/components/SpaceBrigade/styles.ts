import { Coordinate } from "game/Coordinate";
import styled from "styled-components";

export const Image = styled.img<{ $color?: string }>`
  width: 30px;
  height: 30px;
  filter: drop-shadow(0 0 0 ${props => props.$color});
`

export const SpaceShipsNumber = styled.div`
  position: absolute;
  top: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  cursor: default;
`

export const Wrapper = styled.div<{ $coordinate: Coordinate; }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  top: ${props => props.$coordinate.y}px;
  left: ${props => props.$coordinate.x}px;
`