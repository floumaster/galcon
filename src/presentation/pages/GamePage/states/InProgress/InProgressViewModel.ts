import { Planet } from "game/Planet";
import { makeAutoObservable } from "mobx";
import { Coordinate, game } from "game";

export class InProgressViewModel {

  public selectedFromPlanet: Planet | null = null
  public selectedToPlanet: Planet | null = null

  public constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public onClearSelection() {
    this.selectedFromPlanet = null
    this.selectedToPlanet = null
  }

  public getNormalizedLineFromCoordinate(normalizer: (coordinate: Coordinate) => {
    x: number
    y: number
  }) {
    if (this.selectedFromPlanet?.coordinate && this.selectedFromPlanet?.radius)
      return normalizer({
        x: this.selectedFromPlanet?.coordinate.x + this.selectedFromPlanet?.radius / 2,
        y: this.selectedFromPlanet?.coordinate.y + this.selectedFromPlanet?.radius,
      })
  }

  public onPlanetSelect(planet: Planet) {
    const isEnemyOrNeutralPlanet = planet.owner !== game.players.find(player => player.name === game.currentPlayerName)?.id
    if (
      !this.selectedFromPlanet
      && !isEnemyOrNeutralPlanet
    ) {
      this.selectedFromPlanet = planet
    } else if (this.selectedFromPlanet && !this.selectedToPlanet && isEnemyOrNeutralPlanet) {
      this.selectedToPlanet = planet
      game.sendSpaceBrigade(this.selectedFromPlanet, this.selectedToPlanet)
      this.onClearSelection()
    }
  }
}