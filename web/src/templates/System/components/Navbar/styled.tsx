import styled, { css } from "styled-components";

import { MdHome, MdLogout, MdDashboard, MdAgriculture, MdGrain, MdPeople, MdNature } from "react-icons/md";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 100%;
  overflow: hidden;
  transition: width 0.3s ease;

  &:hover {
    width: 300px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 300px;
`;

export const Center = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const Row = styled(NavLink)`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 40px;
  text-decoration: none;
  align-items: center;
  padding: 10px 20px;
  transition: 0.4s ease;

  &:hover {
    background: #eee;
  }
`;

export const Label = styled.span`
  font-size: 16px;
  color: #777;
  font-weight: 500;
`;

const Icon = css`
  width: 40px;
  height: 40px;
  color: #777;
  cursor: pointer;
  padding: 4px;
`;

export const HomeIcon = styled(MdHome)`
  ${Icon};
`;

export const ExitIcon = styled(MdLogout)`
  ${Icon}
`;

export const DashboardIcon = styled(MdDashboard)`
  ${Icon};
`;

export const FarmIcon = styled(MdAgriculture)`
  ${Icon};
`;

export const HarvestIcon = styled(MdGrain)`
  ${Icon};
`;

export const ProductorIcon = styled(MdPeople)`
  ${Icon};
`;

export const CultivatedPlantIcon = styled(MdNature)`
  ${Icon};
`;
