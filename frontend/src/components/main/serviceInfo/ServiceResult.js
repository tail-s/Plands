import React from "react";
import {
  Container,
  Left,
  InfoImg,
  ExImg,
} from "../serviceResult./serviceInfo/ServiceResult.style";
import pdfImg from "assets/images/pdf.png";
import picImg from "assets/images/pic.png";
import gura from "assets/images/gura.JPG";

const ServiceResult = () => {
  return (
    <Container>
      <Left>
        <InfoImg>
          <img src={pdfImg} alt="pdf"></img>
        </InfoImg>
        <InfoImg>
          <img src={picImg} alt="pic"></img>
        </InfoImg>
      </Left>

      <ExImg>
        <img src={gura} alt="pic"></img>
      </ExImg>
    </Container>
  );
};

export default ServiceResult;
