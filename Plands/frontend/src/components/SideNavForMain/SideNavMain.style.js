import styled from "styled-components";
import { colors } from "styles/variables";

export const SideNavWrapper = styled.div`
  background: linear-gradient(#141e30, #243b55);
  width: 300px;
  text-align: center;
`;

export const SideNavTreeWrapper = styled.div`
  position: sticky;
  top: 30%;
  margin-top: 50px;
  margin-right: 50px;
`;

export const SideNavTree = styled.div`
  width: 100px;
  transform: translateX(50%);
`;

export const SideNavUl = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;
export const SideNavList = styled.li`
  width: auto;
`;
export const SideNavDiv = styled.div`
  padding: 5px;
  width: 43px;
  height: 43px;
  line-height: 2.5;
  margin-bottom: 50px;
  background-color: #faff00;
  font-weight: bolder;
  border-radius: 30px;
  z-index: 3;
  &:hover {
    cursor: pointer;
    background-color: yellowgreen;
  }
`;

export const LineForSide = styled.div`
  position: fixed;
  margin-left: 21px;

  transform: translateX(50%);
  border: 3px solid white;
  width: 0.1px;
  height: 85%;
`;
