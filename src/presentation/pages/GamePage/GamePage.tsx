import React from "react"
import { observer } from "mobx-react"
import { PageWrapper } from "presentation/components"
import { game } from "game"
import * as States from "./states"


export const GamePage = observer(() => {

  return (
    <PageWrapper >
      {
        {
          initial: (
            <States.InitialModal/>
          ),
          lobbyList: (
            <States.LobbyList/>
          ),
          pending: (
            <></>
          ),
          inProgress: (
            <States.InProgress/>
          )
        }[game.state]
      }
    </PageWrapper>
  )
})