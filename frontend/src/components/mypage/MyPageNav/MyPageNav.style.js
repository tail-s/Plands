import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { colors } from "styles/variables";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 5px solid #243b55;
  outline: invert;
  padding-top: 3%;
  width: 400px;
`;

export const NavContent = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0px 30px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bolder;
  padding: 20px;
  width: 70%;
  color: #141e30;

  :hover {
    font-size: 20px;
    background-color: #243b55;
    color: ${colors.whiteColor};
  }

  &:link {
    transition: 0.5s;
    text-decoration: none;
  }

  #icon {
    margin-right: 15px;
  }
`;
