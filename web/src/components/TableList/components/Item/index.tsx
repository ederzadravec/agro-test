import React from 'react';
import * as R from 'ramda';

import type * as Types from '../../types';
import * as S from './styled';

interface ItemProps {
  config: Array<Types.ColumnProps>;
  data: Array<any>;
  index: number;
  onRowClick?: (row: any) => void;
}

const Item: React.FC<ItemProps> = ({ config, data, onRowClick, index }) => {
  const getData = (col: Types.ColumnProps) => {
    if (typeof col.path === 'function') {
      return col.path(data, { index });
    }

    return R.path(col.path.split('.'), data);
  };

  const handleOnClick = () => {
    onRowClick?.(data);
  };

  return (
    <S.Container container spacing={0} onClick={handleOnClick} hasAction={!!onRowClick}>
      {config.map((col, key) => (
        <S.Column key={key} size={col.size} align={col.align}>
          {getData(col)}
        </S.Column>
      ))}
    </S.Container>
  );
};

export default Item;
