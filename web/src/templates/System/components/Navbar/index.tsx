import React from "react";

import Logo from "#/assets/svg/logo.svg";

import * as S from "./styled";

const Navbar: React.FC = () => {
  return (
    <S.Container>
      <S.Content id="content">
        <S.Row to="/dashboard">
          <S.HomeIcon as={Logo} />
          <S.Label>Home</S.Label>
        </S.Row>

        <S.Center>
          <S.Row to="/dashboard">
            <S.DashboardIcon />
            <S.Label>Dashborad</S.Label>
          </S.Row>

          <S.Row to="/productor">
            <S.ProductorIcon />
            <S.Label>Productores</S.Label>
          </S.Row>

          <S.Row to="/farm">
            <S.FarmIcon />
            <S.Label>Fazendas</S.Label>
          </S.Row>

          <S.Row to="/harvest">
            <S.HarvestIcon />
            <S.Label>Safras</S.Label>
          </S.Row>

          <S.Row to="/cultivated-plant">
            <S.CultivatedPlantIcon />
            <S.Label>Culturas Plantadas</S.Label>
          </S.Row>
        </S.Center>

        <S.Row to="/logout">
          <S.ExitIcon />
          <S.Label>Logout</S.Label>
        </S.Row>
      </S.Content>
    </S.Container>
  );
};

export default Navbar;
