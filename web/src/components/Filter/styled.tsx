import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 12px;
`;
