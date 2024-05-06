import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal } from "presentation/components";
import { LobbyListViewModel } from "./LobbyListViewModel";

export const LobbyList = observer(() => {

  const [viewModel] = useState(() => new LobbyListViewModel())

  console.log(viewModel)

  return (
    <Modal width={900}>
      <p style={{color: '#fff'}}>TODO: DISPLAY LOBBIES</p>
    </Modal>
  )
})