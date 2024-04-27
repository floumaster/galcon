import { Player } from "./Player";
import { PlayerProps } from "./PlayerProps";

export class PlayerFactory {
  public constructor() { }

  public createPlayer(props: PlayerProps) {
    return new Player(props)
  }
}