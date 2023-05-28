import styled from "styled-components";
import { colors } from "styles/variables";


export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${colors.blackColor};
  display: flex;
  // justify-content: space-around;
  flex-direction: column;  
`;


export const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #808080;  
`;

export const Circley = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: yellow;  
`;

export const Line = styled.div`

  display: flex;
  justify-content: flex-end;
  padding-right: 20%;
  color: white;

  padding-top: 30%;
  padding-bottom: 30%;  
`;
