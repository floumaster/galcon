import React from "react";
import { observer } from "mobx-react";
import { Modal as Container, ModalIcon } from "./styles";
import { ModalProps } from "./ModalProps";

export const Modal = observer((props: ModalProps) => {
  return (
    <Container $width={props.width} >
      {props.logoUrl && <ModalIcon $logoUrl={props.logoUrl}/>}
      {props.children}
    </Container>
  )
})