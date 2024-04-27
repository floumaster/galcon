import React from "react";
import { observer } from "mobx-react";
import { DividedChildrenProps } from "./DividedChildrenProps";
import { DividerHorizontal } from "./styles";

export const DividedChildren = observer((props: DividedChildrenProps) => {

  const dividerHorizontal = <DividerHorizontal $height={props.emptySpaceLength}/> 

  return (
    <>
      {React.Children.toArray(props.children).map((child, index, children) => {
        const childKey =
          typeof child === 'object'
            ? 'key' in child
              ? child.key
              : index
            : index

        return (
          <React.Fragment key={childKey}>
            {child}
            {index < children.length - 1 && dividerHorizontal}
          </React.Fragment>
        )
      })

      }
    </>
  )
})