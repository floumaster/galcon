import { makeAutoObservable } from "mobx";
import { Coordinate } from "./Coordinate";

export interface ExplosionProps {
  id: number
  radius: number
  coordinate: Coordinate
}

export interface Explosion extends ExplosionProps { }

export class Explosion {

  public constructor(props: ExplosionProps) {
    Object.assign(this, props)
    makeAutoObservable(this, undefined, { autoBind: true })
  }
}
