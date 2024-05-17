import { Player } from "./Player";
import { PlayerProps } from "./PlayerProps";

export class PlayerFactory {
  public constructor() { }

  public createPlayer(props: PlayerProps, onReadyAction: (userId: number, isReady: boolean) => void) {
    return new Player(props, onReadyAction)
  }
}