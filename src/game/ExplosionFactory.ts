import { Explosion, ExplosionProps } from "./Explosion";

export class ExplosionFactory {
  public constructor() { }

  public createExplosion(props: ExplosionProps) {
    return new Explosion(props)
  }
}