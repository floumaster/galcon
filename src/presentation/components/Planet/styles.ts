import { Coordinate } from "game/Coordinate";
import styled from "styled-components";

export const ImageMask = styled.div<{ $radius: number; $color?: string }>`
  position: absolute;
  width: ${props => props.$radius}px;
  height: ${props => props.$radius}px;
  background-color: ${props => props.$color || "none"};
  border-radius: 50%;
  opacity: 0.5;
`

export const Image = styled.img<{ $radius: number; $isSelected?: boolean }>`
  width: ${props => props.$radius}px;
  height: ${props => props.$radius}px;
  box-sizing: content-box;
  border-radius: 50%;
  border: ${props => props.$isSelected ? 4 : 0}px solid rgba(217, 217, 217, 0.5);
  padding: 10px;
`

export const SpaceShipsNumber = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
`

export const Wrapper = styled.div<{ $coordinate: Coordinate; }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 50px;
  height: 50px;
  top: ${props => props.$coordinate.y}px;
  left: ${props => props.$coordinate.x}px;
  cursor: pointer;
  &:hover ${Image}{
    border: 4px solid rgba(217, 217, 217, 0.5);
  }
`