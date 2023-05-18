import styled from "styled-components";
import { colors } from "styles/variables";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 1500px;
  margin-top: 25px;
  background: ${colors.blackColor};
  display: flex;
  flex-direction: row;
`;

export const Left = styled.div`
  margin-top: 10vh;
  background: ${colors.blackColor};
  display: flex;
  flex-direction: column;
`;

export const InfoImg = styled.div`
  padding: 40px;
  width: 30vw;
  height: 30vh;
  left: 30vh;
`;

export const ExImg = styled.div`
  padding: 60px;
  width: 40vw;
  height: 80vh;
`;
