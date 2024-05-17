import React, { useState } from "react";
import { observer } from "mobx-react";
import { GameField, ControlPanel } from "./styles";
import { Coordinate, game } from "game";
import useWindowDimensions from "presentation/utils/useWindowDimensions";
import { Modal, Planet, PrimaryButton, SpaceBrigade } from "presentation/components";
import { InProgressViewModel } from "./InProgressViewModel";
import { PlayerInfo, Counter } from "./components";
import useMousePosition from "presentation/utils/useMousePosition";


export const InProgress = observer(() => {

  const { height, width } = useWindowDimensions();
  const { x, y } = useMousePosition();
  const [viewModel] = useState(() => new InProgressViewModel())

  const planets = game.planets
  const spaceBrigades = game.spaceBrigades
  const players = game.players

  const normalizeCoordinate = (coordinate: Coordinate) => ({
    x: coordinate.x * width / game.settings.width,
    y: coordinate.y * height / game.settings.height,
  })

  // viewModel.getLineAttributes({
  //   x,
  //   y,
  // }, normalizeCoordinate)

  const currentPlayer = game.players.find(player => player.name === game.currentPlayerName)

  const readyButtonText = currentPlayer?.isReady ? 'Not ready' : 'Ready'

  window.oncontextmenu = function ()
  {
      viewModel.onClearSelection();
      return false;
  }

  return (
    <GameField>
      <Counter />
      <ControlPanel>
        <Modal width={250}>
          <>
            {
              players.map(player => (
                <PlayerInfo
                  name={player.name}
                  isReady={player.isReady}
                  color={player.color}
                  score={
                    game.state === 'inProgress' ?
                      planets.filter(planet => planet.owner === player.id)
                      .map(planet => planet.units)
                      .reduce((a, b) => a + b, 0) :
                      undefined
                  }/>
              ))
            }
            {
              (
                game.state === 'pending' && <PrimaryButton onClick={() => {
                  if(currentPlayer)
                    game.onUserChangeReadinessState(currentPlayer?.id, !currentPlayer?.isReady)
                }}>{readyButtonText}</PrimaryButton>   
              )
            }
          </>
        </Modal>
      </ControlPanel>
      {
        planets.map(planet => {
          return (
            <Planet
              radius={planet.radius * width / game.settings.width}
              spaceShipsAmount={Math.round(planet.units)}
              coordinate={normalizeCoordinate(planet.coordinate)}
              color={players.find(player => player.id === planet.owner)?.color}
              key={planet.id}
              isSelected={viewModel.selectedFromPlanet?.id === planet.id}
              onClick={(e) => {
                console.log(e)
                viewModel.onPlanetSelect(planet)
              }}
              
            />
          )
        })
      }
      {
        spaceBrigades.map(spaceBrigade => {
          return (
            <SpaceBrigade
              spaceShipsAmount={spaceBrigade.units}
              coordinate={normalizeCoordinate(spaceBrigade.coordinate)}
              color={players.find(player => player.id === spaceBrigade.owner)?.color}
              key={spaceBrigade.id}
            />
          )
        })
      }
    </GameField>
  )
})