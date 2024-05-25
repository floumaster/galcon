import React from 'react';
import { observer } from 'mobx-react';
import { Wrapper, Image, SpaceShipsNumber, ImageMask } from './styles';
import Moon from 'presentation/assets/img/moon.png';
import { PlanetProps } from './PlanetProps';

export const Planet = observer((props: PlanetProps) => {
  return (
    <Wrapper $radius={props.radius} onClick={props.onClick} $coordinate={props.coordinate}>
      <Image src={Moon} $radius={props.radius} $isSelected={props.isSelected}/>
      <ImageMask $radius={props.radius} $color={props.color}/>
      <SpaceShipsNumber>{props.spaceShipsAmount}</SpaceShipsNumber>
    </Wrapper>
  );
});