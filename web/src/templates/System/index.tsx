import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

import * as S from "./styled";
const Auth: React.FC = () => {
  return (
    <S.Container>
      <S.Navbar>
        <Navbar />
      </S.Navbar>

      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  );
};

export default Auth;
