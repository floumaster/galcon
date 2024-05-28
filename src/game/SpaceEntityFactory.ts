import { Planet, PlanetProps } from "./Planet";
import { SpaceBrigade } from "./SpaceBrigade";
import { SpaceEntity } from "./SpaceEntity";

export class SpaceEntityFactory {
  public constructor() { }

  public createSpaceBrigade(props: SpaceEntity) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new SpaceBrigade(props)
  }

  public createPlanet(props: PlanetProps) {
    return new Planet(props)
  }
}