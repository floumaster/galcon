import { makeAutoObservable } from "mobx";

export class LobbyListViewModel {
  public constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }


}