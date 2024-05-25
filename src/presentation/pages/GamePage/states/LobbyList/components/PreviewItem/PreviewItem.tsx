import { observer } from 'mobx-react';
import { PreviewItemProps } from './PreviewItemProps';
import { ColoredSquare, ItemBox, PlayerCell, PlayersBox } from './styles';
import React from 'react';

export const PreviewItem = observer((props: PreviewItemProps) => {
  return (
    <ItemBox>
        <div>Name: {props.lobby?.owner.username}</div>
        <div>Players: {props.lobby?.users.length}/4</div>
        {props.lobby?.users.length !== 0 && <PlayersBox>
             {props.lobby?.users.map(user => (
                <PlayerCell key={user.id}>
                    <div >{user.name}</div>
                    <ColoredSquare $color={user.color}></ColoredSquare>
                </PlayerCell>
              ))}
              </PlayersBox>
        }
    </ItemBox>
  );
});
