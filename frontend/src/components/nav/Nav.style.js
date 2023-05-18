import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { colors } from "styles/variables";

export const BlackNav = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 0;
  width: 100%;
  height: 50px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: ${colors.whiteColor};
  z-index: 15;
  border-bottom: 2px solid ${colors.pointColor};

  span {
  }
`;

export const NavStyle = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  text-decoration: none;
  color: ${colors.blackColor};
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 0.1rem;
  transition: all 0.5s ease;

  &:hover {
    color: ${colors.whiteColor};
    background: ${colors.blackColor};
    transition: all 0.5s ease;
  }
`;
