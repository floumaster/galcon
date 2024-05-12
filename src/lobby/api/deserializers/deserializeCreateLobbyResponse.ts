import { SpaceEntityType } from "game/SpaceEntityType";
import { GetLobbyResponse } from "../responses";

export const deserializeCreateLobbyResponse = (lobbyResponse: GetLobbyResponse) => ({
  ...lobbyResponse,
  map: {
    settings: {
      speed: lobbyResponse.map.settings.speed,
      width: lobbyResponse.map.settings.width,
      height: lobbyResponse.map.settings.height,
    },
    planets: lobbyResponse.map.planets.map(planet => ({
      id: planet.id,
      type: 'Planet' as SpaceEntityType,
      coordinate: {
        x: planet.x,
        y: planet.y,
      },
      owner: planet.owner,
      production: planet.production,
      units: planet.units,
      radius: planet.radius
    }))
  }
})