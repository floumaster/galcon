import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, DividedChildren, TextInput, PrimaryButton } from "presentation/components"
import Logo from 'presentation/assets/img/logo.png'
import { InitialModalViewModel } from "./InitialModalViewModel";
import { game } from "game";

export const InitialModal = observer(() => {

  const [viewModel] = useState(() => new InitialModalViewModel())

  const onTextChange = (e: any) => {
    viewModel.setName(e.target.value)
  }

  const onPlayButtonClick = () => {
    game.setState('lobbyList')
  }

  return (
    <Modal width={500} logoUrl={Logo}>
      <DividedChildren >
        <TextInput placeholder="Name" value={viewModel.name} onChange={onTextChange}/>
        <PrimaryButton disabled={!viewModel.name.length} onClick={onPlayButtonClick}>Play</PrimaryButton>
      </DividedChildren>
    </Modal>
  )
})