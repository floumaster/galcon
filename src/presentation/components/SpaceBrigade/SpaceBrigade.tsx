import React from "react";
import { observer } from "mobx-react";
import { Wrapper, Image, SpaceShipsNumber } from "./styles";
import SpaceShip from 'presentation/assets/img/spaceship.png'
import { SpaceBrigadeProps } from "./SpaceBrigadeProps";

export const SpaceBrigade = observer((props: SpaceBrigadeProps) => {
  return (
    <Wrapper $coordinate={props.coordinate}>
      <SpaceShipsNumber>{`{${props.spaceShipsAmount}}`}</SpaceShipsNumber>
      <Image src={SpaceShip} $color={props.color} />
    </Wrapper>
  )
})