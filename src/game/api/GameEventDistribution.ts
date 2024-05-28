import { API_ROOT } from "../../const"
import { makeAutoObservable } from "mobx"
import { io } from "socket.io-client"

export class GameEventDistribution {
  public socket
  private messages: any[] = []

  public get lastMessage() {
    return this.messages.length > 0 ? this.messages[this.messages.length - 1] : null
  }

  public constructor(jwtToken: string, roomId: number) {
    this.socket = io(API_ROOT, {
      auth: {
        token: jwtToken,
      },
      query: {
        roomId,
      },
    });
    makeAutoObservable(this, undefined, { autoBind: true })
  }
}