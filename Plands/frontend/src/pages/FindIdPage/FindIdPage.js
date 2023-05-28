import React, { useState } from "react";
import {
  Container,
  FindIdBlock,
  FindIdHeader,
  Content,
  ContentRow,
} from "./FindIdPage.style";
import Nav from "components/nav/Nav";
import { useNavigate } from "react-router-dom";
import { findId } from "utils/api/memberApi";
import Swal from "sweetalert2";

const FindIdPage = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const onClickFindBtn = (e) => {
    // 아이디 찾기 요청
    findId(email)
      .then((res) => {
        Swal.fire({
          title: `${res.data}`,
          icon: "success",
          confirmButtonText: "확인",
        });

        navigate("/login");
      })
      .catch(() => {
        Swal.fire({
          title: "이메일 주소를 확인해주세요",
          icon: "error",
          confirmButtonText: "확인",
          timer: 3000,
        });
      });
  };

  return (
    <div>
      <Nav />
      <Container>
        <FindIdBlock>
          <FindIdHeader>
            <div id="title">아이디 찾기</div>
          </FindIdHeader>
          <Content>
            <ContentRow>
              <input
                type="email"
                id="email"
                placeholder="이메일 주소를 입력해주세요."
                value={email}
                onChange={handleEmail}
              />
            </ContentRow>
            <ContentRow>
              <button onClick={onClickFindBtn}>찾기</button>
            </ContentRow>
          </Content>
        </FindIdBlock>
      </Container>
    </div>
  );
};

export default FindIdPage;
