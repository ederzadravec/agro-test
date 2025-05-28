import styled from 'styled-components';

export const Container = styled.div<{
  align?: 'center' | 'space-between';
  padding: number;
}>`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  justify-content: ${({ align }) => align};
  padding: 0 ${({ padding }) => padding}px;
  gap: 20px;
`;
