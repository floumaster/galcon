import { makeAutoObservable } from "mobx";
import { LobbyProps } from "./LobbyProps";

export interface Lobby extends LobbyProps { }

export class Lobby {
  public constructor(props: LobbyProps) {
    Object.assign(this, props)
    makeAutoObservable(this, undefined, { autoBind: true })
  }
}