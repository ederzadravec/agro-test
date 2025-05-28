import React from 'react';

import type * as Types from '../../types';
import * as S from './styled';
import Column from '../Column';

const Row: React.FC<Types.FormGridRowProps> = ({ config }) => {
  return (
    <S.Container container>
      {config.map((column, key) => (
        <Column key={key} last={config.length - 1 <= key} {...column} />
      ))}
    </S.Container>
  );
};

export default Row;
