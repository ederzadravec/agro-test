import styled from 'styled-components';

export const Container = styled.div<{ direction: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  width: 100%;
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.palette.error.main};
  font-size: 12px;
  margin-top: 2px;
`;
