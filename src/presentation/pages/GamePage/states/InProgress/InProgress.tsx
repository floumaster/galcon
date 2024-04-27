import React, { useState } from "react";
import { observer } from "mobx-react";
import { GameField } from "./styles";
import { Coordinate, game } from "game";
import useWindowDimensions from "presentation/utils/useWindowDimensions";
import { Planet, SpaceBrigade } from "presentation/components";
import { InProgressViewModel } from "./InProgressViewModel";

const gameFieldWidth = 100
const gameFiledHeight = 74

export const InProgress = observer(() => {

  const { height, width } = useWindowDimensions();
  const [viewModel] = useState(() => new InProgressViewModel())

  const planets = game.planets
  const spaceBrigades = game.spaceBrigades
  const players = game.players

  const normalizeCooradinate = (coordinate: Coordinate) => ({
    x: coordinate.x * width / gameFieldWidth,
    y: coordinate.y * height / gameFiledHeight,
  })

  return (
    <GameField>
      {
        planets.map(planet => {
          return (
            <Planet
              radius={planet.radius}
              spaceShipsAmount={planet.spaceShipsAmount}
              coordinate={normalizeCooradinate(planet.coordinate)}
              color={players.find(player => player.id === planet.ownerId)?.color}
              key={planet.id}
              isSelected={viewModel.selectedFromPlanet?.id === planet.id}
              onClick={() => viewModel.onPlanetSelect(planet)}
            />
          )
        })
      }
      {
        spaceBrigades.map(spaceBrigade => {
          return (
            <SpaceBrigade
              spaceShipsAmount={spaceBrigade.spaceShipsAmount}
              coordinate={normalizeCooradinate(spaceBrigade.coordinate)}
              color={players.find(player => player.id === spaceBrigade.ownerId)?.color}
              key={spaceBrigade.id}
            />
          )
        })
      }
    </GameField>
  )
})