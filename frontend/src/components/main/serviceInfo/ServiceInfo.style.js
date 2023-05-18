import styled from "styled-components";
import { colors } from "styles/variables";

export const Container = styled.div`
  width: 100%;
  height: 1000px;
  background: linear-gradient(#141e30, #243b55);
  border-bottom: 10px solid black;
`;

export const InfoMsg = styled.div`
  margin-top: 100px;
  padding: 30px;
  font-size: 30px;
  font-weight: bold;
  line-height: 60px;
  color: ${colors.whiteColor};

  img {
    display: flex;
    height: 100px;
    width: 50px;
  }
`;
export const ServiceInfoWrapper = styled.div`
  width: 100%;
`;
export const ContentWrapper = styled.div`
  padding-top: 100px;
  text-align: center;
`;
export const InfoImg = styled.div`
  display: flex;
  padding: 60px;
  height: 100px;
  justify-content: center;
`;

export const InfoMsgForEx = styled.div`
  padding: 30px;
  font-size: 30px;
  font-weight: bold;
  line-height: 60px;
  color: ${colors.whiteColor};
`;

export const InfoImgForEx = styled.div`
  display: flex;
  padding: 60px;
  height: 450px;
  justify-content: center;
`;

export const PdfImg = styled.img`
  margin-right: 10px;
  margin-left: 10px;
`;

export const LiveImg = styled.img`
  border-radius: 15px;
`;
