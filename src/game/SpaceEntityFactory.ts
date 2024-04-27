import { Planet, PlanetProps } from "./Planet";
import { SpaceBrigade } from "./SpaceBrigade";
import { SpaceEntity } from "./SpaceEntity";

export class SpaceEntityFactory {
  public constructor() { }

  public createSpaceBrigade(props: SpaceEntity) {
    return new SpaceBrigade(props)
  }

  public createPlanet(props: PlanetProps) {
    return new Planet(props)
  }
}