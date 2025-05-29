import styled from "styled-components";
import type { PaletteColorsEnum } from "types/styled-components/enuns";

export const Overlay = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
`;

export const Container = styled.div<{ type: PaletteColorsEnum }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  width: 100%;
  background: ${({ theme, type }) => theme.palette[type].main};
  color: ${({ theme, type }) => theme.palette[type].text};
  padding: 20px 0;
`;

export const Content = styled.div`
  height: 100%;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
`;

export const Title = styled.span`
  font-size: 24px;
`;

export const Message = styled.span`
  font-size: 16px;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
