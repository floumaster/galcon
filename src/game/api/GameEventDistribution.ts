import { makeAutoObservable } from "mobx"

const SOCKET_HUB_URL = ''

export class GameEventDistribution {
  private hubConnection: any
  private messages: any[] = []

  public get lastMessage() {
    return this.messages.length > 0 ? this.messages[this.messages.length - 1] : null
  }

  public constructor() {
    this.hubConnection = 'Socket io instance creating'
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public connect() {
    //process messages
  }

  public reconnect() {

  }

  public disconnect() {

  }
}