import React from "react";

import type { GridProps } from "#/components/Grid";

import * as S from "./styled";

const Card: React.FC<GridProps> = ({ ...props }) => {
  return <S.Container {...props} />;
};

export default Card;
