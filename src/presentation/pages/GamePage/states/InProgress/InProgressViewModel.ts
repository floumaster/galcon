import { Planet } from "game/Planet";
import { makeAutoObservable } from "mobx";
import { game } from "game";

export class InProgressViewModel {

  public selectedFromPlanet: Planet | null = null
  public selectedToPlanet: Planet | null = null

  public constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public onPlanetSelect(planet: Planet) {
    const isEnemyOrNeutralPlanet = planet.ownerId !== game.players.find(player => player.name === game.currentPlayerName)?.id
    if (
      !this.selectedFromPlanet
      && !isEnemyOrNeutralPlanet
    ) {
      this.selectedFromPlanet = planet
    } else if (this.selectedFromPlanet && !this.selectedToPlanet && isEnemyOrNeutralPlanet) {
      this.selectedToPlanet = planet
      game.sendSpaceBrigade(this.selectedFromPlanet, this.selectedToPlanet)
      this.selectedFromPlanet = null
      this.selectedToPlanet = null
    }
  }
}