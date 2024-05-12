import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, PrimaryButton } from "presentation/components";
import { LobbyListViewModel } from "./LobbyListViewModel";

export const LobbyList = observer(() => {

  const [viewModel] = useState(() => new LobbyListViewModel())

  return (
    <Modal width={900}>
      <div style={{color: '#fff', height: 20}}  onClick={viewModel.createLobby}>klek</div>
      {
        viewModel.lobbies.map(lobby => (
          <div style={{color: '#fff', height: 20}} onClick={() => viewModel.selectLobbyId(lobby.id)}>{lobby.owner.username}</div>
        ))
      }
      <PrimaryButton onClick={viewModel.joinLobby}>Join</PrimaryButton>
    </Modal>
  )
})