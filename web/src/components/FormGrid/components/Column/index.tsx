import React from "react";

import type * as Types from "../../types";
import * as S from "./styled";

interface ColumnProps extends Types.FormGridColumnProps {
  last: boolean;
}

const Column: React.FC<ColumnProps> = ({ type, schema, props, size = { md: 12 }, hide, columnProps = {} }) => {
  if (hide?.()) return null;

  const Component = React.createElement<any>(type, {
    name: schema,
    ...props?.(schema),
  });

  return (
    <S.Container size={size} {...columnProps}>
      {Component}
    </S.Container>
  );
};

export default Column;
