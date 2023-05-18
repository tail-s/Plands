import styled from "styled-components";
import { colors } from "styles/variables";

export const Container = styled.div`
  background: linear-gradient(#141e30, #243b55);
  border-bottom: 5px solid #243b55;
`;

export const Title = styled.div`
  font-size: 30px;
  font-weight: bolder;
  line-height: 80px;
  color: ${colors.whiteColor};
  margin-left: 40px;
`;
