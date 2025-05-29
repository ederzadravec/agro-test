import React from "react";

import type * as Types from "./types";
import * as S from "./styled";

import Row from "./components/Row";
import Loader from "../Loader";

const FormGrid: React.FC<Types.FormGridProps> = ({ config, children, loading, ...props }) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <S.Container {...props}>
      {config.map((row, key) => (
        <Row key={key} config={row} />
      ))}

      {children}
    </S.Container>
  );
};

export default FormGrid;

export type FormConfig = Array<Array<Types.FormGridColumnProps>>;
