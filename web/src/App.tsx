import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import theme from "./assets/theme";

import Routes from "./Routes";

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
        <Routes />
      </ThemeProvider>
    </>
  );
};

export default App;
