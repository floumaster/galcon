import { makeAutoObservable } from "mobx";
import { SpaceEntity } from "./SpaceEntity";
import { Coordinate } from "./Coordinate";

export interface SpaceBrigadeProps extends SpaceEntity {
  fromCoordinate: Coordinate;
  toCoordinate: Coordinate;
}

export interface SpaceBrigade extends SpaceBrigadeProps { }

export class SpaceBrigade {
  private startTime: number;
  private speed: number = 0.63;
  private animationFrameId: number | null = null;

  public constructor(props: SpaceBrigadeProps) {
    Object.assign(this, props);
    this.fromCoordinate = props.fromCoordinate;
    this.toCoordinate = props.toCoordinate;
    this.startTime = Date.now();
    makeAutoObservable(this, undefined, { autoBind: true });
    this.startMovement();
  }

  private getDistance(a: Coordinate, b: Coordinate): number {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  }

  private startMovement() {
    const totalDistance = this.getDistance(this.fromCoordinate, this.toCoordinate);
    const travelTime = totalDistance / this.speed;

    const animate = () => {
      const elapsedTime = (Date.now() - this.startTime) / 1000; // Convert milliseconds to seconds
      const fraction = Math.min(elapsedTime / travelTime, 1);

      this.coordinate.x = this.fromCoordinate.x + fraction * (this.toCoordinate.x - this.fromCoordinate.x);
      this.coordinate.y = this.fromCoordinate.y + fraction * (this.toCoordinate.y - this.fromCoordinate.y);

      if (fraction < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
      }
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }
}