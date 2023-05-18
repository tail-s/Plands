import styled from "styled-components";

export const SideNavWrapper = styled.div`
  background-color: #cbcfd4;

  width: 300px;
  text-align: center;
`;

export const SideNavTreeWrapper = styled.div``;

export const SideNavTree = styled.nav`
  position: fixed;
  transform: translateX(50%);
`;

export const SideNavUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

export const SideNavDiv = styled.div`
  padding: 5px;
  width: 43px;
  height: 43px;
  line-height: 2.5;
  margin-bottom: 15px;
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
  margin-left: 24px;

  transform: translateX(50%);
  border: 1px solid black;
  width: 0.1px;
  height: 90%;
`;
