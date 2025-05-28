import React from 'react';
import type { ScreensType } from 'types/styled-components';

import * as S from './styled';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: number;
  size?: Partial<ScreensType>;
  container?: boolean;
  children: any;
  direction?: 'row' | 'column';
}

const Grid: React.FC<GridProps> = ({
  container = false,
  spacing = 12,
  direction = 'row',
  size = { md: 12 },
  children,
  ...props
}) => {
  if (container)
    return (
      <S.Container spacing={spacing} {...props}>
        {children}
      </S.Container>
    );

  return (
    <S.Content spacing={spacing} direction={direction} size={size as ScreensType} {...props}>
      {children}
    </S.Content>
  );
};

export default Grid;
