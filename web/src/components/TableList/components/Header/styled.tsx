import styled from "styled-components";

import Grid from "../../../Grid";

export const Container = styled(Grid)`
  display: flex;
  flex-direction: row;
  font-weight: bold;
  /* background: ${({ theme }) => theme.palette.primary.main}; */
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 14px;
  height: 40px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.main};
`;

export const Column = styled(Grid)`
  padding: 0 8px;
`;
