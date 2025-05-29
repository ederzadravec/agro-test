import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ToastContainer } from "react-toastify";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { AuthContext } from "#/contexts";
import { ConfirmDialog } from "#/components";

import theme from "./assets/theme";
import Routes from "./Routes";

ChartJS.register(ArcElement, Tooltip, Legend);

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0px;
    height: 100dvh;
    width: 100dvw;
    color: #333;
  }

  * {
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={theme}>
        <AuthContext.Provider>
          <Routes />
        </AuthContext.Provider>

        <ConfirmDialog.Provider />
        <ToastContainer position="top-center" />
      </ThemeProvider>
    </>
  );
};

export default App;
