import { makeAutoObservable } from "mobx";
import { SpaceEntity } from "./SpaceEntity";

export interface PlanetProps extends SpaceEntity {
  radius: number
  production: number
}

export interface Planet extends PlanetProps { }

export class Planet {

  public constructor(props: PlanetProps) {
    Object.assign(this, props)
    makeAutoObservable(this, undefined, { autoBind: true })
  }
}
