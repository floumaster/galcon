import React from "react";
import { observer } from "mobx-react";
import { Wrapper, Image, Background, SpaceShipsNumber } from "./styles";
import SpaceShip from "presentation/assets/img/spaceship1.png";
import { SpaceBrigadeProps } from "./SpaceBrigadeProps";

export const SpaceBrigade = observer((props: SpaceBrigadeProps) => {
  return (
    <Wrapper $coordinate={props.coordinate}>
      <Background $color={props.color} />
      <SpaceShipsNumber $color={props.color}>
        {props.spaceShipsAmount}
      </SpaceShipsNumber>
      <Image src={SpaceShip} />
    </Wrapper>
  );
});
