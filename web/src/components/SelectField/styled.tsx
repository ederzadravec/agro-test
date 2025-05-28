import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.div`
  font-size: 12px;
  font-weight: 700;
  line-height: 28px;
  color: ${({ theme }) => theme.palette.primary.main};
`;


export const InputContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
