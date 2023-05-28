import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { colors } from "styles/variables";

export const Container = styled.div`
  width: 100%;
`;

export const StyledSlider = styled(Slider)`
  width: 100%;
  .slick-slide div {
    outline: none;
  }

  .slick-arrow {
    position: absolute;
    /* 두 화살표의 공통 요소 */
    width: 10px;
    height: 10px;
    &:hover {
      &::before {
        color: ${colors.blackColor};
      }
    }
  }

  margin-right: 0;
`;

export const ImgContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 600px;

  #carouselContent {
    position: absolute;
    text-align: center;
    width: 100%;
    font-size: 30px;
    font-weight: bold;

    color: ${colors.whiteColor};

    p {
      text-shadow: 0 0 2px ${colors.blackColor};
    }
  }
`;

export const Img = styled.img`
  width: 100%;
`;

export const CarouselText = styled.div`
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
`;

export const CarouselTextP = styled.p`
  font-size: 45px;
  font-weight: bolder;
`;

export const CarouselButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: white;
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-weight: bolder;

  &:hover {
    cursor: pointer;
    color: white;
    background-color: dimgray;
  }
`;

export const ImgFilter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.12);
`;

const imgUrl3 = require("assets/images/travel3.jpg");
const imgUrl4 = require("assets/images/travel4.jpg");
const imgUrl5 = require("assets/images/travel5.jpg");
const imgUrl6 = require("assets/images/travel6.jpg");

export const items = [
  { id: 3, url: imgUrl3 },
  { id: 4, url: imgUrl4 },
  { id: 5, url: imgUrl5 },
  { id: 6, url: imgUrl6 },
];
