import React from "react";

import { Grid, Title } from "#/components";
import { useService } from "#/hooks";
import { generateColor } from "#/utils/generators";

import Total from "./components/Total";
import Graph from "./components/Graph";

import * as S from "./styled";

const Dashboard: React.FC = () => {
  const totalService = useService("GET", "/dashboard/total", {}, true);
  const stateService = useService("GET", "/dashboard/by-state", {}, true);
  const cultivatedPlantService = useService("GET", "/dashboard/by-cultivated-plant", {}, true);

  const stateData = React.useMemo(() => {
    if (!stateService.data) return undefined;

    const { labels, data } = stateService.data.reduce(
      (acc, item) => {
        acc.labels.push(item.state.uf);
        acc.data.push(item.total);

        return acc;
      },
      { labels: [], data: [] }
    );

    return {
      labels,
      datasets: [
        {
          label: "Fazendas por estados",
          data,
          backgroundColor: generateColor(data.length),
        },
      ],
    };
  }, [stateService.data]);

  const cultivatedPlantData = React.useMemo(() => {
    if (!cultivatedPlantService.data) return undefined;

    const { labels, data } = cultivatedPlantService.data.reduce(
      (acc, item) => {
        acc.labels.push(item.name);
        acc.data.push(item.total);

        return acc;
      },
      { labels: [], data: [] }
    );

    return {
      labels,
      datasets: [
        {
          label: "Cultura plantada",
          data,
          backgroundColor: generateColor(data.length),
        },
      ],
    };
  }, [cultivatedPlantService.data]);

  const areaUseData = React.useMemo(() => {
    if (!totalService.data) return undefined;

    return {
      labels: ["Vegetação", "Agrigutura"],
      datasets: [
        {
          label: "Uso de area",
          data: [totalService.data.vegetation_area_sum, totalService.data.areable_area_sum],
          backgroundColor: generateColor(2),
        },
      ],
    };
  }, [totalService.data]);

  return (
    <>
      <Title title="Dashboard" />
      <S.Content>
        <Grid container>
          <Total size={{ md: 6 }} label="Fazendas cadastradas" value={totalService.data?.farms} loading={totalService.loading} />

          <Total size={{ md: 6 }} label="Hectares registrados" value={totalService.data?.total_area_sum} loading={totalService.loading} />
        </Grid>

        <Grid container>
          <Graph size={{ md: 4 }} label="Fazendas por estado" value={stateData} loading={stateService.loading} />

          <Graph size={{ md: 4 }} label="Por cultura plantada" value={cultivatedPlantData} loading={cultivatedPlantService.loading} />

          <Graph size={{ md: 4 }} label="Por uso do solo" value={areaUseData} loading={totalService.loading} />
        </Grid>
      </S.Content>
    </>
  );
};

export default Dashboard;
