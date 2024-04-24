import React from "react";
import { observer } from "mobx-react";
import { InputWrapper, Input as InputField } from "./Input.styles";

export const Input = observer(() => {
  return (
    <InputWrapper>
      <InputField />
    </InputWrapper>
  )
})