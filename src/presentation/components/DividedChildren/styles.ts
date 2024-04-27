import styled from "styled-components";

export const DividerHorizontal = styled.div<{ $height?: number; }>`
  height: ${props => props.$height || 20}px
`