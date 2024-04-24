import { makeAutoObservable } from "mobx";
import { GameState } from "./GameState";

class Game {
  private _state: GameState = 'initial'
  private _userId: string | null = null

  public get state() {
    return this._state
  }

  public get userId() {
    return this._userId
  }

  public constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public setState(state: GameState) {
    this._state = state
  }

  public setUserId(userId: string) {
    return this._userId = userId
  }
}

export const game = new Game()