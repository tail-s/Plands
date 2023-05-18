import React, { useState } from "react";
import {
  Container,
  LoginBlock,
  LoginHeader,
  LoginContent,
  LoginContentRow,
} from "./LogInPage.style";
import Nav from "components/nav/Nav";
import { useDispatch } from "react-redux";
import { LOGIN_TOKEN, USER_NICKNAME } from "store/slice/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { login } from "utils/api/sessionApi";
import { getMemberDetail } from "utils/api/memberApi";
import Swal from "sweetalert2";
import { joinPlan } from "utils/api/planApi";

const LogInPage = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const { uuid } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleId = (event) => {
    setId(event.target.value);
  };

  const handlePw = (event) => {
    setPw(event.target.value);
  };

  const onClickRegistBtn = (e) => {
    console.log(uuid);
    if (uuid) {
      navigate(`/regist/${uuid}`);
    } else {
      navigate(`/regist`);
    }
  };

  const onClickLoginBtn = (e) => {
    if (id === "") {
      Swal.fire({
        title: "아이디를 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
        timer: 3000,
      });
    } else if (pw === "") {
      Swal.fire({
        title: "비밀번호를 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
        timer: 3000,
      });
    } else {
      // 로그인 요청
      login({
        id: id,
        pwd: pw,
      })
        .then((res) => {
          Swal.fire({
            title: "로그인에 성공하였습니다.",
            icon: "success",
            confirmButtonText: "확인",
            timer: 3000,
          });

          const accessToken = res.data["access-token"].value;
          const refreshToken = res.data["refresh-token"].value;

          dispatch(LOGIN_TOKEN([accessToken, refreshToken]));

          if (uuid) {
            getMemberDetail(accessToken).then((res) => {
              console.log(res);
              dispatch(USER_NICKNAME(res.data.nickname));
              navigate("/");
            });
            joinPlan(accessToken, uuid).then((res) => {
              navigate("/plans");
            });
          } else {
            // 멤버 정보 요청
            getMemberDetail(accessToken).then((res) => {
              dispatch(USER_NICKNAME(res.data.nickname));
              navigate("/");
            });
          }
        })
        .catch(() => {
          Swal.fire({
            title: "아이디와 비밀번호를 확인해주세요.",
            icon: "error",
            confirmButtonText: "확인",
            timer: 3000,
          });
        });
    }
  };

  const onClickFindIdBtn = () => {
    navigate("/find/id");
  };

  const onClickFindPwBtn = () => {
    navigate("/find/pwd");
  };

  return (
    <div>
      <Nav />
      <Container>
        <LoginBlock>
          <LoginHeader>
            <div id="title">LOGIN</div>
          </LoginHeader>
          <LoginContent>
            <LoginContentRow>
              <input
                type="text"
                id="id"
                placeholder="아이디를 입력해주세요."
                value={id}
                onChange={handleId}
              />
            </LoginContentRow>
            <LoginContentRow>
              <input
                type="password"
                id="pw"
                placeholder="비밀번호를 입력해주세요."
                value={pw}
                onChange={handlePw}
              />
            </LoginContentRow>
            <LoginContentRow>
              <button id="logIn-btn" onClick={onClickLoginBtn}>
                로그인
              </button>
            </LoginContentRow>
            <LoginContentRow>
              <div id="footer">
                <p>아직 회원이 아니신가요?</p>
                <button id="signUp-btn" onClick={onClickRegistBtn}>
                  회원가입
                </button>
                <button id="findId-btn" onClick={onClickFindIdBtn}>
                  아이디 찾기
                </button>
                <button id="findPw-btn" onClick={onClickFindPwBtn}>
                  비밀번호 찾기
                </button>
              </div>
            </LoginContentRow>
          </LoginContent>
        </LoginBlock>
      </Container>
    </div>
  );
};

export default LogInPage;
