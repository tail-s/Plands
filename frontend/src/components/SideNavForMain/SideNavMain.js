import * as S from "./SideNavMain.style";

const SideNavMain = () => {
  const handleClick = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <S.SideNavWrapper>
      <S.SideNavTreeWrapper>
        <S.SideNavTree>
          <S.SideNavUl>
            <S.LineForSide />
            <S.SideNavDiv onClick={() => handleClick("serviceInfo")}>
              <S.SideNavList>소개</S.SideNavList>
            </S.SideNavDiv>
            <S.SideNavDiv onClick={() => handleClick("serviceEx")}>
              <S.SideNavList>예시</S.SideNavList>
            </S.SideNavDiv>
            <S.SideNavDiv onClick={() => handleClick("serviceResult")}>
              <S.SideNavList>결과</S.SideNavList>
            </S.SideNavDiv>
            <S.SideNavDiv onClick={() => handleClick("topHeader")}>
              <S.SideNavList>맨위로</S.SideNavList>
            </S.SideNavDiv>
          </S.SideNavUl>
        </S.SideNavTree>
      </S.SideNavTreeWrapper>
    </S.SideNavWrapper>
  );
};

export default SideNavMain;
