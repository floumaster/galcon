import { Lobby } from 'lobby/Lobby';

export interface ListItemProps {
    lobby?: Lobby;
    clickHandler?: () => void;
}