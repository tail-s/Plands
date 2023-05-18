import React, { useState } from "react";
import {
  Container,
  FindPwBlock,
  FindPwHeader,
  Content,
  ContentRow,
} from "./FindPwPage.style";
import Nav from "components/nav/Nav";
import { useNavigate } from "react-router-dom";
import { findPassword } from "utils/api/emailApi";
import Swal from "sweetalert2";

const FindPwPage = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleId = (event) => {
    setId(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const onClickFindBtn = (e) => {
    // 비밀번호 찾기 -> 임시 비밀번호 발급 요청
    findPassword({
      id: id,
      email: email,
    })
      .then((res) => {
        Swal.fire({
          title: "임시 비밀번호를 발송했습니다.",
          icon: "success",
          confirmButtonText: "확인",
          timer: 3000,
        });
        navigate("/login");
      })
      .catch((err) => {
        Swal.fire({
          title: "입력 정보를 확인해주세요.",
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
        <FindPwBlock>
          <FindPwHeader>
            <div id="title">비밀번호 찾기</div>
          </FindPwHeader>
          <Content>
            <ContentRow>
              <input
                type="text"
                id="id"
                placeholder="아이디를 입력해주세요."
                value={id}
                onChange={handleId}
              />
            </ContentRow>
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
        </FindPwBlock>
      </Container>
    </div>
  );
};

export default FindPwPage;
