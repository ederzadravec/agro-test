import 'styled-components';

import * as Theme from 'assets/theme';

import { PaletteValues, ScreensValues, ScreensEnum } from './enuns';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: PaletteValues;
    helpers: typeof Theme.helpers;
    screens: ScreensValues;
  }
}

export type ScreensType = Partial<Record<ScreensEnum, 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | number>>;
