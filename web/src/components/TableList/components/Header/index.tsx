import React from 'react';

import type * as Types from '../../types';
import * as S from './styled';

interface HeaderProps {
  config: Array<Types.ColumnProps>;
}

const Header: React.FC<HeaderProps> = ({ config }) => {
  return (
    <S.Container container spacing={0}>
      {config.map((col, key) => (
        <S.Column key={key} size={col.size}>
          {col.title}
        </S.Column>
      ))}
    </S.Container>
  );
};

export default Header;
