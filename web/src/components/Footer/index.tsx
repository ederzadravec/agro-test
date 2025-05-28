import React from 'react';

import * as S from './styled';

interface FooterProps {
  children: any;
  align?: 'center' | 'space-between';
  padding?: number;
}

const Footer: React.FC<FooterProps> = ({ align = 'center', padding = 0, children }) => {
  return (
    <S.Container align={align} padding={padding}>
      {children}
    </S.Container>
  );
};

export default Footer;
