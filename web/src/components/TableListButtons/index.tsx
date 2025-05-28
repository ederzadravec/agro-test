import React from "react";
import * as R from "ramda";
import type { IconType } from "react-icons";

import * as S from "./styled";

interface ButtonProps {
  icon: IconType | ((row: any) => IconType);
  label?: string;
  onClick: (row: any) => void;
}

export interface TableListButtonsProps {
  data: any;
  config: Array<ButtonProps>;
}

const TableListButtons: React.FC<TableListButtonsProps> = ({ data, config }) => {
  const handleOnClick = (action: (row: any) => void) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    action?.(data);
  };

  return (
    <S.Container>
      {config?.map((item, key) => {
        const icon = R.is(Function, item.icon) ? (item.icon(data) as IconType) : (item.icon as IconType);

        return (
          <S.Button key={key} onClick={handleOnClick(item.onClick)}>
            {item.label && <S.Label>{item.label}</S.Label>}

            <S.Icon as={icon} />
          </S.Button>
        );
      })}
    </S.Container>
  );
};

export default TableListButtons;
