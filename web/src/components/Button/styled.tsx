import styled, { css } from "styled-components";

import type * as Types from "./types";

export const Container = styled.div<{ width?: number | string }>`
  width: max-content;
  min-width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  text-decoration: none;
`;

interface ContainerProps {
  color: Types.Color;
  variant: Types.Variant;
  disabled: boolean;
  progress?: number;
}

const VARIANTS: {
  [key: string]: {
    [type: string]: "text" | "main" | null;
  };
} = {
  default: {
    border: "main",
    background: "main",
    text: "text",
  },
  outlined: {
    border: "main",
    background: null,
    text: "main",
  },
  transparent: {
    border: null,
    background: null,
    text: "main",
  },
  gradient: {
    border: null,
    background: "main",
    text: "text",
  },
};

export const Content = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  height: 40px;
  border-radius: 10px;
  font-size: 18px;
  padding: 0px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  flex-direction: row;
  gap: 12px;
  text-decoration: none;

  ${({ color, variant, disabled, theme }) => {
    const borderType = VARIANTS[variant].border;
    const backgroundType = VARIANTS[variant].background;
    const colorType = VARIANTS[variant].text;

    let borderColor = borderType ? theme.helpers.getColor(color, borderType) : "transparent";
    let backgroundColor = backgroundType ? theme.helpers.getColor(color, backgroundType) : "transparent";
    const textColor = colorType ? theme.helpers.getColor(color, colorType) : "transparent";

    if (disabled) {
      borderColor = `${backgroundColor}77`;
      backgroundColor = `${backgroundColor}77`;
    }

    const border = `2px solid ${borderColor}`;

    return css`
      cursor: ${disabled ? "not-allowed" : "pointer"};
      border: ${border};
      background: ${backgroundColor};
      color: ${textColor};
    `;
  }}

  ${({ progress }) =>
    !progress
      ? ""
      : css`
          &:before {
            position: absolute;
            content: " ";
            display: block;
            top: 0;
            left: 0;
            width: ${progress}%;
            height: 100%;
            background: rgba(255, 255, 255, 0.25);
            transition: ease 0.4s;
          }
        `}
`;

interface LoaderProps {
  colorProp: Types.Color;
  variant: Types.Variant;
}

export const Icon = styled.span<Pick<ContainerProps, "color" | "variant">>`
  display: flex;
  align-items: center;
  ${({ color, variant, theme }) => {
    const colorType = VARIANTS[variant].text;
    const textColor = colorType ? theme.helpers.getColor(color, colorType) : "transparent";

    return css`
      color: ${textColor};
      font-size: 20px;
    `;
  }}
`;

export const Loader = styled.span<LoaderProps>`
  span {
    ${({ variant, colorProp, theme }) => {
      const colorType = VARIANTS[variant].text;

      return css`
        background-color: ${colorType ? theme.helpers.getColor(colorProp, colorType) : "transparent"} !important;
      `;
    }}
  }
`;
