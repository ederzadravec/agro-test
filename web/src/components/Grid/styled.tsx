import styled, { css } from 'styled-components';

import type { ScreensType } from 'types/styled-components';
import type { ScreensEnum } from 'types/styled-components/enuns';

export const Container = styled.div<{ spacing: number }>`
  display: flex;
  flex-direction: row;
  width: calc(100% + ${({ spacing }) => spacing}px);
  flex-wrap: wrap;
  justify-content: flex-start;
  transition: all ease 1s;
  row-gap: ${({ spacing }) => spacing}px;
  margin: 0 -${({ spacing }) => spacing / 2}px;
`;

export const Content = styled.div<{ spacing: number; size: ScreensType; direction: 'row' | 'column' }>`
  ${({ spacing, theme, size, direction }) => css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${direction};
    width: calc(((100% / 12) * ${size.xl || size.lg || size.md || size.sm || size.xs || 12}) - ${spacing}px);
    margin: 0 ${spacing / 2}px;

    ${(Object.keys(size) as Array<ScreensEnum>)
      .map((key) => {
        return theme.screens[key](`width: calc(((100% / 12) * ${size?.[key] as number}) - ${spacing}px)`, size[key]);
      })
      .join(';')}
  `}
`;
