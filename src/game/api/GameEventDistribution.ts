import { API_ROOT } from "const"
import { makeAutoObservable } from "mobx"
import { io } from "socket.io-client"

export class GameEventDistribution {
  private socket
  private messages: any[] = []

  public get lastMessage() {
    return this.messages.length > 0 ? this.messages[this.messages.length - 1] : null
  }

  public constructor(jwtToken: string, roomId: string) {
    this.socket = io(API_ROOT, {
      auth: {
        token: jwtToken,
      },
      query: {
        roomId,
      },
    });
    this.socket.on('RoomUserJoin', (event) => {
      console.log('RoomUserJoin', event);
    });

    this.socket.on('RoomUserLeave', (event) => {
      console.log('RoomUserLeave', event);
    });

    this.socket.on('RoomStateChangeEvent', (event) => {
      console.log('RoomStateChangeEvent', event);

    });

    this.socket.on('PlanetOccupiedEvent', (event) => {
      console.log('PlanetOccupiedEvent', event);
    });

    this.socket.on('BatchSendEvent', (event) => {
      console.log('BatchSendEvent', event);
    });

    this.socket.on('BatchCollisionEvent', (event) => {
      console.log('BatchCollisionEvent', event);
    });

    socket.emit('RoomStateChangeEvent', { state: 'start' });
    socket.emit('BatchSendEvent', data);
    makeAutoObservable(this, undefined, { autoBind: true })
  }
}