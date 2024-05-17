import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, DividedChildren, TextInput, PrimaryButton, ErrorText } from "presentation/components"
import Logo from 'presentation/assets/img/logo.png'
import { InitialModalViewModel } from "./InitialModalViewModel";
import { game } from "game";

export const InitialModal = observer(() => {

  const [viewModel] = useState(() => new InitialModalViewModel())
  const [errorMessage, setErrorMessage] = useState('')

  const onTextChange = (e: any) => {
    viewModel.setName(e.target.value)
  }

  const onPlayButtonClick = async () => {
    try {
      await game.authorize(viewModel.name)
    }
    catch(err) {
      setErrorMessage('This user already exists')
    }
  }

  return (
    <Modal width={500} logoUrl={Logo}>
      <DividedChildren >
        <TextInput placeholder="Name" value={viewModel.name} onChange={onTextChange}/>
        <ErrorText>{errorMessage}</ErrorText>
        <PrimaryButton disabled={!viewModel.name.length} onClick={onPlayButtonClick}>Play</PrimaryButton>
      </DividedChildren>
    </Modal>
  )
})