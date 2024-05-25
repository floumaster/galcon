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
  const [viewModel] = useState(() => new InProgressViewModel())
  const { x, y } = useMousePosition()

  const planets = game.planets
  const spaceBrigades = game.spaceBrigades
  const players = game.players

  const normalizeCoordinate = (coordinate: Coordinate) => ({
    x: coordinate.x * width / game.settings.width,
    y: coordinate.y * height / game.settings.height,
  })

  const currentPlayer = game.players.find(player => player.name === game.currentPlayerName)

  const readyButtonText = currentPlayer?.isReady ? 'Not ready' : 'Ready'

  window.oncontextmenu = function ()
  {
      viewModel.onClearSelection();
      return false;
  }

  let x1 = null
  let y1 = null
  const x2 = x
  const y2 = y

  const normalizedLineFromCoordinate = viewModel.getNormalizedLineFromCoordinate(normalizeCoordinate)
  if(normalizedLineFromCoordinate) {
    x1 = normalizedLineFromCoordinate.x
    y1 = normalizedLineFromCoordinate.y
  }


  const length = x1 && y1 && x2 && y2 ? Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) : 0;
  const angle =  x1 && y1 && x2 && y2 ? Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI : 0;

  return (
    <GameField>
      <Counter />
      {!!(length && angle && y1 && x1) &&(<div style={{
        width: length,
        height: 2,
        position: 'absolute',
        top: y1,
        left: x1,
        transformOrigin: '0 0',
        transform: 'rotate(' + angle + 'deg)', 
        backgroundColor: '#fff',
        }}
      />)}
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