import { makeAutoObservable } from "mobx";
import { SpaceEntity } from "./SpaceEntity";
import { Coordinate } from "./Coordinate";

export interface SpaceBrigadeProps extends SpaceEntity {
  fromCoordinate: Coordinate
  toCoordinate: Coordinate
}

export interface SpaceBrigade extends SpaceBrigadeProps { }

export class SpaceBrigade {
  private animationFrameId: number | null = null;

  public constructor(props: SpaceEntity) {
    Object.assign(this, props)
    makeAutoObservable(this, undefined, { autoBind: true })
    this.startMovement(Date.now())
  }

  private startMovement(startTime: number) {
    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000; // Convert milliseconds to seconds
      this.updatePosition(elapsedTime);
      if (elapsedTime < 10) { // Continue for the duration of 10 seconds
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

  private updatePosition(elapsedTime: number) {
    const duration = 10; // Duration to complete the journey in seconds
    const fraction = Math.min(elapsedTime / duration, 1);

    this.coordinate.x = this.fromCoordinate.x + fraction * (this.toCoordinate.x - this.fromCoordinate.x);
    this.coordinate.y = this.fromCoordinate.y + fraction * (this.toCoordinate.y - this.fromCoordinate.y);
  }
}
