import React from 'react';
import { useTheme } from 'styled-components';
import { BounceLoader } from 'react-spinners';

import * as S from './styled';

interface LoaderProps {
  show?: boolean;
  children?: any;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ show, size = 48, children }) => {
  const theme = useTheme();

  if (!show) return children;

  return (
    <S.Container>
      <BounceLoader color={theme!.palette.primary.main} size={size} />
    </S.Container>
  );
};

export default Loader;
