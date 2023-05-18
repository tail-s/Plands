import * as S from "./Nav.style";

const Nav = () => {
  return (
    <S.BlackNav>
      <S.NavStyle to="/">홈</S.NavStyle>
      <S.NavStyle to="/plans">여행계획관리</S.NavStyle>
      <S.NavStyle to="/about">소개</S.NavStyle>
    </S.BlackNav>
  );
};

export default Nav;
