import styled from "styled-components";

import Grid from "../../../Grid";
import type { GridProps } from "../../../Grid";
import type { ColumnProps } from "../../types";

interface ContainerProps extends GridProps {
  align?: ColumnProps["align"];
  verticalAlign?: ColumnProps["verticalAlign"];
  top?: ColumnProps["top"];
  bottom?: ColumnProps["bottom"];
}

export const Container = styled(Grid)<ContainerProps>`
  flex-direction: row;
  justify-content: ${({ align }) => align || "unset"};
  align-items: ${({ verticalAlign }) => verticalAlign || "unset"};
  margin-top: ${({ top }) => top || 0}px;
  margin-bottom: ${({ bottom }) => bottom || 0}px;
`;
