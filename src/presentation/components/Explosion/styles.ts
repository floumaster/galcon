import { Coordinate } from "game/Coordinate";
import styled from "styled-components";

export const Image = styled.img<{ $radius: number }>`
  width: ${props => props.$radius}px;
  height: ${props => props.$radius}px;
  box-sizing: content-box;
  border-radius: 50%;
  padding: 10px;
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
`