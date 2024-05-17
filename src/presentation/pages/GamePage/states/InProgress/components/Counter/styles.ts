import { colors } from "const";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0,0,0,0.6);
`

export const Number = styled.p`
  width: 20px;
  height: 20px;
  color: ${colors.WHITE};
  font-size: 50px;
  font-weight: 700;
  z-index: 4;
`