export interface LobbyProps {
  id: number;
  owner: {
    id: number;
    username: string;
  };
  state: string;
  users: any[];
}