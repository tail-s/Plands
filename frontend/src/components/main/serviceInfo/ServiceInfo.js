import React from "react";
import * as S from "./ServiceInfo.style";
import friendsImg from "assets/images/friends_white.png";
import arrowImg from "assets/images/arrow.png";
import carImg from "assets/images/car.png";
import computerImg from "assets/images/computer.png";
import exImage1 from "assets/images/serviceEx.PNG";
import serviceInfoImg from "assets/images/serviceinfo.png";
import pdfImg1 from "assets/images/pdf1.jpg";
import pdfImg2 from "assets/images/pdf2.jpg";

const ServiceInfo = () => {
  return (
    <S.ServiceInfoWrapper>
      <S.Container id="serviceInfo">
        <S.ContentWrapper>
          <S.InfoMsg>
            가족 혹은 지인들과 함께 여행 계획을 세워보세요!
            <br />
            <br />
            함께 이야기하고 여행 계획을 편집하며 모두의
            생각이 들어간 여행 계획을 세울 수 있습니다.
          </S.InfoMsg>
          <S.InfoImg>
            <img src={friendsImg} alt="friends"></img>
            <img src={arrowImg} alt="arrow"></img>
            <img src={computerImg} alt="computer"></img>
            <img src={arrowImg} alt="arrow"></img>
            <img src={carImg} alt="car"></img>
          </S.InfoImg>
        </S.ContentWrapper>
      </S.Container>
      <S.Container id="serviceEx">
        <S.ContentWrapper>
          <S.InfoMsgForEx>
            구성원이 함께 모여 여행 계획서를 동시에 작성할
            수 있습니다!
            <br />
            <br />
            함께 새로운 여행계획을 세워보세요!
          </S.InfoMsgForEx>
          <S.InfoImgForEx>
            <S.LiveImg
              src={serviceInfoImg}
              alt="serviceinfo"
            ></S.LiveImg>
          </S.InfoImgForEx>
        </S.ContentWrapper>
      </S.Container>
      <S.Container id="serviceResult">
        <S.ContentWrapper>
          <S.InfoMsg>
            계획서를 PDF 파일로 다운로드 받아보세요!
          </S.InfoMsg>
          <S.InfoImgForEx>
            <S.PdfImg src={pdfImg1} alt="pdf1" />
            <S.PdfImg src={pdfImg2} alt="pdf2" />
          </S.InfoImgForEx>
        </S.ContentWrapper>
      </S.Container>
    </S.ServiceInfoWrapper>
  );
};

export default ServiceInfo;
