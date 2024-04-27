import { makeAutoObservable } from "mobx";
import { SpaceEntity } from "./SpaceEntity";
import { Coordinate } from "./Coordinate";

export interface SpaceBrigadeProps extends SpaceEntity {
  fromCoordinate: Coordinate
  toCoordinate: Coordinate
}

export interface SpaceBrigade extends SpaceBrigadeProps { }

export class SpaceBrigade {

  public constructor(props: SpaceEntity) {
    Object.assign(this, props)
    makeAutoObservable(this, undefined, { autoBind: true })
  }
}
