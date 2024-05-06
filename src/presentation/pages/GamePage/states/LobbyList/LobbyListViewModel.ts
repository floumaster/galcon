import { makeAutoObservable } from "mobx";
import { game } from "game";

export class LobbyListViewModel {
  public constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public get lobbies() {
    return game.lobbies
  }
}