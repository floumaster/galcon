import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { PrimaryButton } from 'presentation/components';
import { LobbyListViewModel } from './LobbyListViewModel';
import { List, LobbyLayout, Preview, BoxContent, ScrollContainer } from './styles';
import { ListItem, PreviewItem } from './components';

export const LobbyList = observer(() => {

  const [viewModel] = useState(() => new LobbyListViewModel());

  const currentLobby = viewModel.lobbies.find(lobby => lobby.id === viewModel.selectedLobbyId);

  const inlineButtonClass = {width: '50%', alignSelf: 'center'};

  return (
    <LobbyLayout>
      <List>
        <BoxContent>
          <ScrollContainer>
            {
              viewModel.lobbies.map(lobby => (
                <ListItem key={lobby.id} lobby={lobby} clickHandler={() => viewModel.selectLobbyId(lobby.id)}></ListItem>
              ))
            }
            </ScrollContainer>
            <PrimaryButton style={inlineButtonClass} onClick={viewModel.createLobby}>Create room</PrimaryButton>
        </BoxContent>
      </List>
      {
      viewModel.selectedLobbyId !== -1 && 
      <Preview >
        <BoxContent>
          <PreviewItem lobby={currentLobby}></PreviewItem>
          <PrimaryButton style={inlineButtonClass} onClick={viewModel.joinLobby}>Join</PrimaryButton>
        </BoxContent>
      </Preview>
    }
    { // empty section
      viewModel.selectedLobbyId === -1 && 
      <Preview></Preview>
    }
    </LobbyLayout>
  );
});