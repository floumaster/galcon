import React from "react";
import { observer } from "mobx-react";
import { Wrapper, Image} from "./styles";
import ExplosionGif from 'presentation/assets/img/WS2k.gif'
import { ExplosionProps } from "./ExplosionProps";

export const Explosion = observer((props: ExplosionProps) => {
  return (
    <Wrapper $coordinate={props.coordinate}>
      <Image $radius={props.radius} src={ExplosionGif}/>
    </Wrapper>
  )
})