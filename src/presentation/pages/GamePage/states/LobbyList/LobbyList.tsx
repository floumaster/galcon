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
  const inlineHeightAuto = {height: 'auto'};

  return (
    <LobbyLayout>
      <List>
        <BoxContent>
            <h1 style={inlineHeightAuto}>Existing rooms:</h1>
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
      <Preview >
        { 
          viewModel.selectedLobbyId !== -1 && 
          <BoxContent>
            <div>
              <h1 style={{height: '80px'}}>Room details:</h1>
              <PreviewItem lobby={currentLobby}></PreviewItem>
            </div>
            {
            currentLobby?.users
            && currentLobby?.users.length >= 0
            && <PrimaryButton style={inlineButtonClass} onClick={viewModel.joinLobby} $isDisabled={currentLobby?.users.length > 3}>Join</PrimaryButton>
            }
          </BoxContent>
        }
      </Preview>
    </LobbyLayout>
  );
});