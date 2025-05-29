import type { DefaultTheme, RuleSet } from "styled-components";

import type { ColorsEnum, PaletteColorsEnum } from "types/styled-components/enuns";

export const text = {
  light: "#fafafa",
  dark: "#333",
};

export const primary = {
  main: "#055668",
  light: "#3F9FB5",
  dark: "#032C36",
  text: text.light,
};

export const success = {
  main: "#28C76F",
  text: text.dark,
};

export const warning = {
  main: "#FF9F43",
  text: text.dark,
};

export const error = {
  main: "#EA5455",
  text: text.light,
};

export const white = {
  main: "#fff",
  text: text.dark,
};

export const whiteBlue = {
  main: "#fff",
  text: primary.main,
};

export const black = {
  main: "#000",
  text: text.light,
};

export const disabled = {
  main: "#BBB",
  text: text.light,
};

export const gradient = {
  main: "linear-gradient(45deg, rgba(228, 136, 252, 1) 0%, rgba(56, 173, 253, 0.7) 50%, rgba(53, 56, 251, 1) 100%);",
  text: text.light,
};

export const background = {
  main: "#F1F1F1",
  text: text.dark,
};

export const colors = {
  blue: {
    main: "#6C73F8",
    text: text.dark,
  },
  purple: {
    main: "#623CE7",
    text: text.light,
  },
};

export const palette = {
  text,
  primary,
  success,
  error,
  warning,
  white,
  whiteBlue,
  black,
  background,
  disabled,
  gradient,
  colors,
};

export const getColor = (color: ColorsEnum | PaletteColorsEnum, type: "main" | "text" = "main"): string => {
  return theme.palette.colors?.[color as ColorsEnum]?.[type] || theme.palette[color as PaletteColorsEnum][type];
};

export const helpers = {
  getColor,
};

export const screens: Record<"xs" | "sm" | "md" | "lg" | "xl", (data: string | RuleSet<object>, include?: number) => string> = {
  xs: (data, include) => (typeof include === "number" ? `@media only screen and (max-width: 600px) { ${data} }` : ""),
  sm: (data, include) => (typeof include === "number" ? `@media only screen and (min-width: 600px) { ${data} }` : ""),
  md: (data, include) => (typeof include === "number" ? `@media only screen and (min-width: 768px)  { ${data} }` : ""),
  lg: (data, include) => (typeof include === "number" ? `@media only screen and (min-width: 992px) { ${data} }` : ""),
  xl: (data, include) => (typeof include === "number" ? `@media only screen and (min-width: 1200px) { ${data} }` : ""),
};

const theme: DefaultTheme = {
  palette,
  helpers,
  screens,
};

export default theme;
