import { useState } from "react";
import * as S from "./SideNav.style";

const SideNav = () => {
  const handleClick = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  return (
    <S.SideNavWrapper>
      <S.SideNavTreeWrapper>
        <S.SideNavTree>
          <S.SideNavUl>
            <S.LineForSide />
            <S.SideNavDiv onClick={() => handleClick("travelTitle")}>
              <li>제목</li>
            </S.SideNavDiv>
            <S.SideNavDiv onClick={() => handleClick("travelMembers")}>
              <li>인원</li>
            </S.SideNavDiv>
            <S.SideNavDiv onClick={() => handleClick("travelDays")}>
              <li>일정</li>
            </S.SideNavDiv>
            <S.SideNavDiv onClick={() => handleClick("travelStart")}>
              <li>출발지</li>
            </S.SideNavDiv>
            <S.SideNavDiv onClick={() => handleClick("travelStay")}>
              <li>숙소</li>
            </S.SideNavDiv>
            <S.SideNavDiv onClick={() => handleClick("travelContent")}>
              <li>컨텐츠</li>
            </S.SideNavDiv>
            <S.SideNavDiv onClick={() => handleClick("travelItems")}>
              <li>준비물</li>
            </S.SideNavDiv>
            <S.SideNavDiv onClick={() => handleClick("travelBudget")}>
              <li>예산</li>
            </S.SideNavDiv>
          </S.SideNavUl>
        </S.SideNavTree>
      </S.SideNavTreeWrapper>
    </S.SideNavWrapper>
  );
};

export default SideNav;
