import React from "react";

import FormGrid from "../FormGrid";
import type { FormConfig } from "../FormGrid";
import * as S from "./styled";

interface FilterProps {
  title?: string;
  config: FormConfig;
}

const Filter: React.FC<FilterProps> = ({ title = "Filtros", config }) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <FormGrid config={config} />
    </S.Container>
  );
};

export default Filter;
