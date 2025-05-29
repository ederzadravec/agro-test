import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const Navbar = styled.div`
  max-width: 300px;
  height: 100%;
  border-right: 1px solid #e0e0e0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  background: #fafbfc;
`;
