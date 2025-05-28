import React from "react";

import * as S from "./styled";

interface TitleProps {
  title: string;
  children?: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ title, children }) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>

      <S.Buttons>{children}</S.Buttons>
    </S.Container>
  );
};

export default Title;
