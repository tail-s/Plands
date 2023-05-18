// npm i react-slick
// npm i slick-carousel

import React from "react";
import * as S from "./Carousel.style";
import { useNavigate } from "react-router-dom";
const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true, // 해당 슬라이드를 무한으로 반복할 수 있도록
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true, // 화면에 올리면 슬라이더가 자동으로 넘어가지 않음
  };
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.CarouselText id="carouselContent">
        <S.CarouselTextP>새로운 여행을 계획해보세요</S.CarouselTextP>
        <S.CarouselButton onClick={() => navigate("/plans")}>
          여행 계획 만들기
        </S.CarouselButton>
      </S.CarouselText>
      <S.StyledSlider {...settings}>
        {S.items.map((item, index) => {
          return (
            <div key={index}>
              <S.ImgFilter />
              <div key={item.id}>
                <S.ImgContainer>
                  <S.Img src={item.url} />
                </S.ImgContainer>
              </div>
            </div>
          );
        })}
      </S.StyledSlider>
    </S.Container>
  );
};

export default Carousel;
