import { observer } from 'mobx-react';
import { ListItemProps } from './ListItemProps';
import { ItemBox } from './styles';
import React from 'react';

export const ListItem = observer((props: ListItemProps) => {
    return (
        <ItemBox onClick={props.clickHandler}>
            <div>{props.lobby?.owner.username}</div>
            {props.lobby?.users.length}/4
        </ItemBox>
    );
});