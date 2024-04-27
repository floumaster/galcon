import { makeAutoObservable } from "mobx";
import { PlayerProps } from "./PlayerProps";

export interface Player extends PlayerProps { }

export class Player {
  public constructor(props: PlayerProps) {
    Object.assign(this, props)
    makeAutoObservable(this, undefined, { autoBind: true })
  }


}