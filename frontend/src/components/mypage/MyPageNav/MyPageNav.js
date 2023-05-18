import React from "react";
import { Container, NavContent } from "./MyPageNav.style";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";

const MyPageNav = () => {
  return (
    <Container>
      <IconContext.Provider
        value={{
          color: "#141e30",
        }}
      >
        <NavContent to="/mypage">
          <FaIcons.FaUserAlt id="icon" />
          회원 정보 보기
        </NavContent>
        <NavContent to="/userinfo/update">
          <FaIcons.FaUserEdit id="icon" />
          회원 정보 수정
        </NavContent>
        <NavContent to="/password/change">
          <FaIcons.FaUserLock id="icon" />
          비밀 번호 변경
        </NavContent>
        <NavContent to="/user/withdraw">
          <FaIcons.FaUserMinus id="icon" />
          회원 탈퇴
        </NavContent>
      </IconContext.Provider>
    </Container>
  );
};

export default MyPageNav;
