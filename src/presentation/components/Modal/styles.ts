import styled from "styled-components";

export const Modal = styled.div<{ $width?: number; }>`
  width: ${props => props.$width + "px" || "100%"};
  height: auto;
  padding: 20px;
  border: 2px solid white;
  border-radius: 20px;
  background-color: rgba(0, 121, 255, 0.1);
`

export const ModalIcon = styled.div<{ $logoUrl?: string; }>`
  background-image: url(${props => props.$logoUrl});
  background-repeat: no-repeat;
  background-size: contain;
  height: 400px;
`