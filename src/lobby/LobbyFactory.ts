import { Lobby } from "./Lobby";
import { LobbyProps } from "./LobbyProps";

export class LobbyFactory {
  public constructor() { }

  public createLobby(props: LobbyProps) {
    return new Lobby(props)
  }
}