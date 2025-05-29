import styled from "styled-components";

export const Label = styled.span`
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const Value = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
`;
