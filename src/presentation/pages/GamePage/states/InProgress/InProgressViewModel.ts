import { Planet } from "game/Planet";
import { makeAutoObservable } from "mobx";
import { Coordinate, game } from "game";

export class InProgressViewModel {

  public selectedFromPlanet: Planet | null = null
  public selectedToPlanet: Planet | null = null

  public constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  public getLineAttributes(mouseCoordinate: Coordinate, normalizeCoordinate: (coordinate: Coordinate) => Coordinate) {
    //if (!this.selectedFromPlanet) return {}
    console.log(mouseCoordinate)
    //const fromCoordinate = normalizeCoordinate(this.selectedFromPlanet.coordinate)
    const fromCoordinate = {
      x: 1,
      y: 1,
    }
    const lineLength = this.getLineLength(fromCoordinate, mouseCoordinate)
    const linePosition = this.getLinePosition(fromCoordinate, mouseCoordinate, lineLength)
    const rotationAngle = this.getRotationAngle(fromCoordinate, mouseCoordinate)
    console.log(lineLength, linePosition, rotationAngle)
  }

  private getLineLength(fromCoordinate: Coordinate, toCoordinate: Coordinate) {
    const { x, y } = fromCoordinate
    const x2 = toCoordinate.x
    const y2 = toCoordinate.y
    return Math.sqrt(Math.pow((x - x2), 2) + Math.pow((y - y2), 2))
  }

  private getLinePosition(fromCoordinate: Coordinate, toCoordinate: Coordinate, length: number) {
    const { x, y } = fromCoordinate
    const x2 = toCoordinate.x
    const y2 = toCoordinate.y
    return {
      x: (x + x2) / 2 - length,
      y: (y + y2) / 2
    }
  }

  private getRotationAngle(fromCoordinate: Coordinate, toCoordinate: Coordinate) {
    const { x, y } = fromCoordinate
    const x2 = toCoordinate.x
    const y2 = toCoordinate.y
    return Math.atan2(y - y2, x - x2) * 180 / Math.PI
  }

  public onClearSelection() {
    this.selectedFromPlanet = null
    this.selectedToPlanet = null
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