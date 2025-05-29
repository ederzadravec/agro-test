import { ScreensType } from "types/styled-components";

export interface ColumnProps {
  align?: "flex-start" | "flex-end" | "center";
  verticalAlign?: "flex-start" | "flex-end" | "center";
  bottom?: number;
  top?: number;
}

export interface FormGridColumnProps {
  schema: string;
  type: any;
  size: ScreensType;
  offset?: ScreensType;
  columnProps?: ColumnProps;
  props?: (schema: string) => any;
  hide?: () => boolean;
}

export interface FormGridRowProps {
  config: Array<FormGridColumnProps>;
}

export interface FormGridProps {
  config: Array<Array<FormGridColumnProps>>;
  children?: any;
  loading?: boolean;
}
