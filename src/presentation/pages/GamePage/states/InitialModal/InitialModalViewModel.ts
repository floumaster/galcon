import { makeAutoObservable } from "mobx"

export class InitialModalViewModel {

  private _name: string = ''

  public get name() {
    return this._name
  }

  public constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public setName(name: string) {
    this._name = name
  }
}