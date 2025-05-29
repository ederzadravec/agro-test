import { ScreensType } from 'types/styled-components';

export interface ColumnProps {
  title: string;
  size: ScreensType;
  path: string | ((data: any, opts: { index: number }) => any);
  align?: string;
}

export interface Paginate {
  perPage: number;
  currentPage: number;
  lastPage: number;
  total: number;
}
