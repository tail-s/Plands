import { useState } from "react";
import {
  isEmail,
  isLength,
  isAlphanumeric,
  isNumeric,
} from "validator";
import Nav from "components/nav/Nav";
import {
  Container,
  RegistFormDiv,
  RegistInputDiv,
  RegistBtnDiv,
  CorrectInput,
  InvalidInput,
  EmailConfirm,
  SendBtn,
  ResendBtn,
  ConfirmBtn,
  RegistBtn,
  CancelBtn,
} from "./RegisterPage.style";
import { useNavigate, useParams } from "react-router-dom";
import { regist } from "utils/api/sessionApi";
import {
  emailSend,
  verifyAuthNumber,
} from "utils/api/emailApi";
import Swal from "sweetalert2";
import { checkId, checkEmail } from "utils/api/memberApi";

const RegisterPage = () => {
  // 사용자 입력값
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdValid, setPwdValid] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [pNumber, setPNumber] = useState("");
  const [email, setEmail] = useState("");

  // 입력값 에러 상태
  const [idErrorAlpha, setIdErrorAlpha] = useState(true);
  const [idErrorLength, setIdErrorLength] = useState(true);
  const [pwdErrorSpecial, setPwdErrorSpecial] =
    useState(true);
  const [pwdErrorLength, setPwdErrorLength] =
    useState(true);
  const [pwdValidError, setPwdValidError] = useState(true);
  const [nameErrorKorean, setNameErrorKorean] =
    useState(true);
  const [nicknameError, setNicknameError] = useState(true);
  const [pNumberError, setPNumberError] = useState(true);
  const [emailError, setEmailError] = useState(true);

  // 아이디 중복 확인
  const [isIdCheck, setIsIdCheck] = useState(false);

  // 이메일 인증 관련
  const [eauthBtn, setEauthBtn] = useState(false);
  const [eauthSuccess, setEauthSuccess] = useState(false);
  const [emailInput, setEmailInput] = useState(false);
  const [eauthNum, setEauthNum] = useState("");
  // const [isEmailDoubleCheck, setIsEmailDoubleCheck] =
  //   useState(false);

  const { uuid } = useParams();
  const navigate = useNavigate();

  // Validation 영역
  // id 검사
  const onChangeId = (e) => {
    const cur = e.target.value;

    if (!isAlphanumeric(cur)) {
      setIdErrorAlpha(true);
    } else setIdErrorAlpha(false);

    if (!isLength(cur, { min: 8, max: 16 })) {
      setIdErrorLength(true);
    } else setIdErrorLength(false);

    setId(cur);
  };

  const onHandleIdDoubleCheck = () => {
    if (id.length === 0 || idErrorLength) {
      Swal.fire({
        title: "아이디를 확인해주세요.",
        icon: "error",
        confirmButtonText: "확인",
        timer: 3000,
      });

      return;
    }
    checkId(id)
      .then((res) => {
        Swal.fire({
          title: "사용 가능한 아이디입니다.",
          icon: "success",
          confirmButtonText: "확인",
          timer: 3000,
        });

        setIsIdCheck(true);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          Swal.fire({
            title: "중복된 아이디입니다.",
            icon: "error",
            confirmButtonText: "확인",
            timer: 3000,
          });
        }
      });
  };

  // pwd 검사
  const onChangePwd = (e) => {
    const cur = e.target.value;
    const passwordRegex =
      /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    if (!isLength(cur, { min: 8, max: 16 })) {
      setPwdErrorLength(true);
    } else {
      setPwdErrorLength(false);
    }

    if (!passwordRegex.test(cur)) {
      setPwdErrorSpecial(true);
    } else {
      setPwdErrorSpecial(false);
    }
    setPwd(cur);
  };

  const onChangePwdValid = (e) => {
    const cur = e.target.value;

    if (pwd !== cur) {
      setPwdValidError(true);
    } else {
      setPwdValidError(false);
    }

    setPwdValid(cur);
  };

  // 이름 검사
  const isKorean = (txt) => {
    const nameReg = /^[가-힣]{1,5}$/;

    if (nameReg.test(txt)) {
      return true;
    } else {
      return false;
    }
  };

  const onChangeName = (e) => {
    const cur = e.target.value;

    if (!isKorean(cur)) {
      setNameErrorKorean(true);
    } else {
      setNameErrorKorean(false);
    }

    setName(cur);
  };

  // 닉네임 검사
  const onChangeNickname = (e) => {
    const cur = e.target.value;
    const nicknameReg =
      /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,10}$/;

    if (!nicknameReg.test(cur)) {
      setNicknameError(true);
    } else {
      setNicknameError(false);
    }

    setNickname(cur);
  };

  // 생년월일 검사
  const onChangeBirthDay = (e) => {
    setBirthDay(e.target.value);
  };

  // 전화번호 검사
  const onChangePNumber = (e) => {
    const cur = e.target.value;

    if (!isNumeric(cur)) {
      setPNumberError(true);
    } else {
      setPNumberError(false);
    }

    setPNumber(cur);
  };

  // 이메일 검사
  const onChangeEmail = (e) => {
    const cur = e.target.value;

    if (!isEmail(cur)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    setEmail(cur);
  };

  const onChangeEauthNum = (e) => {
    setEauthNum(e.target.value);
  };

  // 폼 제출 전 확인 메서드

  const validation = () => {
    if (idErrorAlpha) return false;
    else if (idErrorLength) return false;
    else if (!isIdCheck) return false;
    else if (pwdErrorSpecial) return false;
    else if (pwdErrorLength) return false;
    else if (pwdValidError) return false;
    else if (nameErrorKorean) return false;
    else if (nicknameError) return false;
    else if (pNumberError) return false;
    else if (emailError) return false;
    else if (!eauthSuccess) return false;
    // else if (!isEmailDoubleCheck) return false;
    else return true;
  };

  const onClickEmailSendBtn = () => {
    // if (email.length === 0) {
    //   Swal.fire({
    //     title: "빈 문자열입니다.",
    //     icon: "error",
    //     confirmButtonText: "확인",
    //     timer: 3000,
    //   });

    //   return;
    // }

    if (email.length === 0 || emailError) {
      Swal.fire({
        title: "이메일 주소를 확인해주세요.",
        icon: "error",
        confirmButtonText: "확인",
        timer: 3000,
      });

      return;
    }

    checkEmail(email)
      .then((res) => {
        Swal.fire({
          title: "사용 가능한 이메일입니다.",
          icon: "success",
          confirmButtonText: "확인",
          timer: 3000,
        })
          // .then(() => setIsEmailDoubleCheck(true))
          .then(() => {
            if (!emailError) {
              // 이메일 인증번호 발송 요청
              emailSend(email)
                .then((res) => {
                  Swal.fire({
                    title: "인증번호를 발송했습니다.",
                    icon: "success",
                    confirmButtonText: "확인",
                    timer: 3000,
                  });

                  setEauthBtn(true);
                  setEmailInput(true);
                })
                .catch((err) => {
                  Swal.fire({
                    title: "이메일 주소를 확인해주세요.",
                    icon: "error",
                    confirmButtonText: "확인",
                    timer: 3000,
                  });
                });
            }
          });
      })
      .catch((err) => {
        if (err.response.status === 409) {
          Swal.fire({
            title: "중복된 이메일입니다.",
            icon: "error",
            confirmButtonText: "확인",
            timer: 3000,
          });
        }
      });
  };

  const onHandleEauthSuccess = () => {
    // 이메일 인증번호 확인 요청
    verifyAuthNumber({
      email: email,
      authCode: eauthNum,
    })
      .then((res) => {
        Swal.fire({
          title: "인증에 성공하였습니다.",
          icon: "success",
          confirmButtonText: "확인",
          timer: 3000,
        });

        setEauthSuccess(true);
      })
      .catch((res) => {
        Swal.fire({
          title: "인증번호가 다릅니다.",
          icon: "error",
          confirmButtonText: "확인",
          timer: 3000,
        });
      });
  };

  const onClickReEauthBtn = () => {
    // setIsEmailDoubleCheck(false);
    setEmailInput(false);
    setEauthBtn(false);
    setEauthNum("");
  };

  const onClickRegistBtn = (e) => {
    if (!validation()) {
      Swal.fire({
        title: "회원가입 조건에 맞게 입력하세요.",
        icon: "error",
        confirmButtonText: "확인",
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: "회원가입이 완료되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
        timer: 3000,
      });

      // 회원가입 요청
      regist({
        id: id,
        pwd: pwd,
        name: name,
        nickname: nickname,
        gender: gender,
        birthDay: birthDay,
        pnumber: pNumber,
        email: email,
      }).then((res) => {
        if (uuid) {
          navigate(`/login/${uuid}`);
        } else {
          navigate("/login");
        }
      });
    }
  };

  const onClickCancelBtn = (e) => {
    navigate("/login");
  };

  return (
    <div>
      <Nav />
      <Container>
        <RegistFormDiv method="POST">
          <h1>SIGN UP</h1>
          <RegistInputDiv>
            <span>아이디</span>
            <input
              type="text"
              required
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={onChangeId}
            />
            {!idErrorLength && !idErrorAlpha && (
              <CorrectInput>
                🟢&nbsp;올바른 입력입니다.
              </CorrectInput>
            )}
            {idErrorLength && id && (
              <InvalidInput>
                ❌&nbsp;아이디는 8자 이상 16자 이하로
                되어있어야 합니다.
              </InvalidInput>
            )}
            {idErrorAlpha && id && (
              <InvalidInput>
                ❌&nbsp;영문자 및 숫자로만 이루어져야
                합니다.
              </InvalidInput>
            )}
            <ConfirmBtn
              id="confirmBtn"
              onClick={onHandleIdDoubleCheck}
            >
              중복 확인
            </ConfirmBtn>
          </RegistInputDiv>
          <RegistInputDiv>
            <span>비밀번호</span>
            <input
              type="password"
              required
              placeholder="비밀번호를 입력하세요"
              value={pwd}
              onChange={onChangePwd}
            />
            {!pwdErrorLength && !pwdErrorSpecial && pwd && (
              <CorrectInput>
                🟢&nbsp;올바른 입력입니다.
              </CorrectInput>
            )}
            {pwdErrorLength && pwd && (
              <InvalidInput>
                ❌&nbsp;비밀번호는 8자 이상 16자 이하으로
                구성되어야 합니다.
              </InvalidInput>
            )}
            {pwdErrorSpecial && pwd && (
              <InvalidInput>
                ❌&nbsp;하나 이상의 문자, 하나의 숫자 및
                하나의 특수 문자를 포함해야합니다.
              </InvalidInput>
            )}
          </RegistInputDiv>
          <RegistInputDiv>
            <span>비밀번호 확인</span>
            <input
              type="password"
              required
              placeholder="비밀번호를 다시 한번 입력하세요"
              value={pwdValid}
              onChange={onChangePwdValid}
            />
            {!pwdValidError && pwdValid && (
              <CorrectInput>
                🟢&nbsp;비밀번호가 일치합니다.
              </CorrectInput>
            )}
            {pwdValidError && pwdValid && (
              <InvalidInput>
                ❌&nbsp;비밀번호와 일치하지 않습니다.
                확인해주세요
              </InvalidInput>
            )}
          </RegistInputDiv>
          <RegistInputDiv>
            <span>이름</span>
            <input
              type="text"
              required
              placeholder="이름을 입력하세요"
              value={name}
              onChange={onChangeName}
            />
            {!nameErrorKorean && name && (
              <CorrectInput>
                🟢&nbsp;올바른 입력입니다.
              </CorrectInput>
            )}
            {nameErrorKorean && name && (
              <InvalidInput>
                ❌&nbsp;이름은 한글로 1~5자까지
                입력가능합니다.
              </InvalidInput>
            )}
          </RegistInputDiv>
          <RegistInputDiv>
            <span>닉네임</span>
            <input
              type="text"
              required
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={onChangeNickname}
            />
            {!nicknameError && nickname && (
              <CorrectInput>
                🟢&nbsp;올바른 입력입니다.
              </CorrectInput>
            )}
            {nicknameError && nickname && (
              <InvalidInput>
                ❌&nbsp;닉네임은 한글,영어,숫자(최대10자)
                이루어져야합니다.
              </InvalidInput>
            )}
          </RegistInputDiv>
          <RegistInputDiv>
            <span>성별</span>
            <select
              name="gender"
              id="genderSelect"
              onChange={(e) => {
                setGender(
                  e.target.selectedOptions[0].value
                );
              }}
              required
            >
              <option value="">성별을 선택해주세요</option>
              <option value="M">남성</option>
              <option value="W">여성</option>
            </select>
          </RegistInputDiv>
          <RegistInputDiv>
            <span>생년월일</span>
            <input
              type="text"
              required
              placeholder="YYYYMMDD"
              value={birthDay}
              onChange={onChangeBirthDay}
            />
          </RegistInputDiv>
          <RegistInputDiv>
            <span>전화번호</span>
            <input
              type="tel"
              required
              placeholder="전화번호를 입력하세요"
              value={pNumber}
              onChange={onChangePNumber}
            />
            {!pNumberError && pNumber && (
              <CorrectInput>
                🟢&nbsp;올바른 입력입니다.
              </CorrectInput>
            )}
            {pNumberError && pNumber && (
              <InvalidInput>
                ❌&nbsp; 번호 숫자만 입력해주세요.
              </InvalidInput>
            )}
          </RegistInputDiv>
          <RegistInputDiv>
            <span>이메일</span>
            {emailInput ? (
              <input
                type="email"
                required
                placeholder="이메일 주소를 입력하세요"
                name="email"
                value={email}
                disabled
              />
            ) : (
              <input
                type="email"
                required
                placeholder="이메일 주소를 입력하세요"
                name="email"
                value={email}
                onChange={onChangeEmail}
              />
            )}
            {!emailError && email && (
              <CorrectInput>
                🟢&nbsp;올바른 입력입니다.
              </CorrectInput>
            )}
            {emailError && email && (
              <InvalidInput>
                ❌&nbsp; 이메일 형식대로 입력해주세요.
              </InvalidInput>
            )}
            <EmailConfirm>
              {eauthBtn ? (
                <>
                  <input
                    value={eauthNum}
                    placeholder="인증번호를 입력해주세요"
                    onChange={onChangeEauthNum}
                  />
                  <ConfirmBtn
                    id="confirmBtn"
                    onClick={onHandleEauthSuccess}
                  >
                    인증 확인
                  </ConfirmBtn>
                  <ResendBtn
                    id="reEauthBtn"
                    onClick={onClickReEauthBtn}
                  >
                    이메일 재입력
                  </ResendBtn>
                </>
              ) : (
                <SendBtn
                  id="sendBtn"
                  onClick={onClickEmailSendBtn}
                >
                  인증하기
                </SendBtn>
              )}
            </EmailConfirm>
          </RegistInputDiv>
          <RegistBtnDiv>
            <RegistBtn onClick={onClickRegistBtn}>
              회원가입
            </RegistBtn>
            <CancelBtn onClick={onClickCancelBtn}>
              취소
            </CancelBtn>
          </RegistBtnDiv>
        </RegistFormDiv>
      </Container>
    </div>
  );
};

export default RegisterPage;
