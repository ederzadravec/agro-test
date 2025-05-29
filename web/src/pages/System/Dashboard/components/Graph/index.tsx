import React from "react";
import { Pie } from "react-chartjs-2";
import type { ChartData } from "chart.js";

import { Loader } from "#/components";
import type { GridProps } from "#/components/Grid";

import Card from "../Card";
import * as S from "./styled";

interface GraphProps extends Omit<GridProps, "children"> {
  label: string;
  value?: ChartData<"pie">;
  loading?: boolean;
}

const Graph: React.FC<GraphProps> = ({ label, value, loading, ...props }) => {
  return (
    <Card direction="column" {...props}>
      <Loader show={loading}>
        <S.Label>{label}</S.Label>

        {value && <Pie data={value} />}
      </Loader>
    </Card>
  );
};

export default Graph;
