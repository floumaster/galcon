import React from "react";
import { observer } from "mobx-react";
import { Label, Wrapper, Color } from "./styles";
import { PlayerInfoProps } from "./PlayerInfoProps";
import { game } from "game/Game";

const READY_STATE = 'Ready to play'
const NOT_READY_STATE = 'Waiting'
const WINNER_STATE = 'Winner'
const LOSER_STATE = 'Loser'

export const PlayerInfo = observer((props: PlayerInfoProps) => {

  const isPlayerLooser = props.score === 0
  const isPlayerWinner = game.gameWinner?.name === props.name
  
  return (
    <Wrapper>
      <Label>{props.name}</Label>
      <Label>
        {
          isPlayerWinner
          ? WINNER_STATE : isPlayerLooser
          ? LOSER_STATE : props.score
          ? Math.round(props.score) : props.isReady
          ? READY_STATE : NOT_READY_STATE
        }
      </Label>
      <Color $color={props.color}/>
    </Wrapper>
  )
})