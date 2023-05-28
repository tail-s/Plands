import React, { useState } from "react";
import { Container, Title } from "./MyPageTitle.style";
import { useSelector } from "react-redux";
import { getMemberDetail } from "utils/api/memberApi";

const MyPageTitle = () => {
  return (
    <div>
      <Container>
        <Title>My Page</Title>
        {/* <div id="title">{nickName}님의 마이 페이지</div> */}
      </Container>
    </div>
  );
};

export default MyPageTitle;
