import styled from "styled-components";
import { colors } from "styles/variables";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // background: linear-gradient(#141e30, #243b55);
  width: 100%;
  height: 500px;
`;

export const Form = styled.div`
  width: 500px;
  height: 60px;
  padding: 50px;
`;

export const Label = styled.div`
  font-size: 25px;
  display: inline-block;
  position: relative;
  transition: all 0.5s ease-in-out;
  font-weight: bolder;
  color: #141e30;
  padding-right: 10px;
  padding-left: 10px;
`;

export const WithdrawBtn = styled.button`
  padding: 10px;
  border-radius: 5px;
  width: 170px;
  background: ${colors.redColor};
  margin-left: 5px;
  margin-right: 5px;
  color: ${colors.blackColor};
  font-size: 20px;
  font-weight: bolder;
  border: none;

  &:hover {
    background: #8a3d3f;
    color: ${colors.redColor};
    cursor: pointer;
  }
`;
