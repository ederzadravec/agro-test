import React from "react";

import { Loader } from "#/components";
import type { GridProps } from "#/components/Grid";

import Card from "../Card";
import * as S from "./styled";

interface TotalProps extends Omit<GridProps, "children"> {
  label: string;
  value: number;
  loading?: boolean;
}

const Total: React.FC<TotalProps> = ({ label, value = 0, loading, ...props }) => {
  return (
    <Card direction="column" {...props}>
      <Loader show={loading}>
        <S.Label>{label}</S.Label>

        <S.Value>{value}</S.Value>
      </Loader>
    </Card>
  );
};

export default Total;
