import { colors } from "const";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`

export const Label = styled.p`
  width: auto;
  margin: 0;
  color: ${colors.WHITE}
`

export const Color = styled.div<{ $color?: string; }>`
  width: 50px;
  height: 20px;
  background-color: ${props => props.$color || colors.WHITE}  
`