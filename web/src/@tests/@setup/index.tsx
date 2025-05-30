import React from "react";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "#/contexts";
import { ConfirmDialog } from "#/components";

import theme from "#/assets/theme";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthContext.Provider>

      <ConfirmDialog.Provider />
      <ToastContainer position="top-center" />
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { customRender as render };
