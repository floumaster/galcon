import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Wrapper, Number } from "./styles";
import { SECONDS_TO_WAIT } from "const";
import { game } from "game/Game";

export const Counter = observer(() => {

  const [secondsToWait, setSecondsToWait] = useState(SECONDS_TO_WAIT)

  useEffect(() => {
    if(!secondsToWait) {
      game.onGameStart()
    }
  }, [secondsToWait])
  
  useEffect(() => {
    let interval = null
    if(game.isGameReady && game.state === 'pending' && secondsToWait > 0) {
      setSecondsToWait(SECONDS_TO_WAIT)
      interval = setInterval(() => {
        setSecondsToWait(secondsToWait => secondsToWait - 1);
      }, 1000);
    }
    return () => {
      if(interval) {
        clearInterval(interval)
      }
    };
  }, [game.isGameReady, game.state])

  return (
    game.isGameReady && game.state === 'pending' && secondsToWait > 0 ? (
      <Wrapper>
        <Number>
          {secondsToWait}
        </Number>
      </Wrapper>
    ) : null
  )
})