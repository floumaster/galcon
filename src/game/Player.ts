import { makeAutoObservable } from "mobx";
import { PlayerProps } from "./PlayerProps";

export interface Player extends PlayerProps { }

export class Player {

  private onReadyAction

  public constructor(props: PlayerProps, onReadyAction: (userId: number, isReady: boolean) => void) {
    Object.assign(this, props)
    this.onReadyAction = onReadyAction
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public changeReadyState(isReady: boolean) {
    this.isReady = isReady
    this.onReadyAction(this.id, isReady)
  }

}