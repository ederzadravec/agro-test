import styled from 'styled-components';

import Grid from '../../../Grid';

export const Container = styled(Grid)<{ hasAction: boolean }>`
  height: 48px;
  font-size: 12px;
  display: flex;
  align-items: center;
  transition: 0.4s;
  border-bottom: 1px solid #ddd;
  cursor: ${({ hasAction }) => (hasAction ? 'pointer' : 'not-allowed')};

  &:hover {
    background: #eee;
  }
`;

export const Column = styled(Grid)<{ align?: string }>`
  padding: 0 8px;
  justify-content: ${({ align }) => align || 'flex-start'};
`;
