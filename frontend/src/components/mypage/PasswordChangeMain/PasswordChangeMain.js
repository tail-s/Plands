import {
  Container,
  Form,
  Label,
  CorrectInput,
  InvalidInput,
  ButtonDiv,
  CancelBtn,
  ChangeBtn,
} from "./PasswordChangeMain.style";
import { useState } from "react";
import { isLength } from "validator";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { modifyPassword } from "utils/api/memberApi";
import Swal from "sweetalert2";

const PasswordChangeMain = () => {
  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

  const navigate = useNavigate();

  const [curPwd, setCurPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newPwdValid, setNewPwdValid] = useState("");

  // 입력값 에러 상태
  const [pwdErrorSpecial, setPwdErrorSpecial] =
    useState(true);
  const [pwdErrorLength, setPwdErrorLength] =
    useState(true);
  const [pwdValidError, setPwdValidError] = useState(true);

  // pwd 검사
  const onChangeNewPwd = (e) => {
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

    setNewPwd(cur);
  };

  const onChangeNewPwdValid = (e) => {
    const cur = e.target.value;

    if (newPwd !== cur) {
      setPwdValidError(true);
    } else {
      setPwdValidError(false);
    }

    setNewPwdValid(cur);
  };

  const validation = () => {
    if (pwdErrorSpecial) {
      return false;
    } else if (pwdErrorLength) {
      return false;
    } else if (pwdValidError) {
      return false;
    } else {
      return true;
    }
  };

  const onClickCancelBtn = () => {
    navigate("/mypage");
  };

  const onClickChangeBtn = () => {
    if (!validation()) {
      Swal.fire({
        title: "비밀번호 조건에 맞추어 다시 입력해주세요.",
        icon: "error",
        confirmButtonText: "확인",
        timer: 3000,
      });

      return;
    } else {
      Swal.fire({
        title: "비밀번호를 변경하였습니다.",
        icon: "success",
        confirmButtonText: "확인",
        timer: 3000,
      });

      // 비밀번호 변경 요청
      modifyPassword(accessToken, {
        inputPwd: curPwd,
        newPwd: newPwd,
      })
        .then(() => {
          navigate("/mypage");
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  return (
    <Container>
      <Form>
        <Label id="nowPw">
          <label>현재 비밀번호</label>
          <input
            type="password"
            value={curPwd}
            onChange={(e) => {
              setCurPwd(e.target.value);
            }}
          />
        </Label>
        <Label>
          <label>신규 비밀번호</label>
          <input
            type="password"
            required
            placeholder="비밀번호를 입력하세요"
            value={newPwd}
            onChange={onChangeNewPwd}
          />
          {!pwdErrorLength &&
            !pwdErrorSpecial &&
            newPwd && (
              <CorrectInput>
                🟢&nbsp;올바른 입력입니다.
              </CorrectInput>
            )}
          {pwdErrorLength && newPwd && (
            <InvalidInput>
              ❌&nbsp;비밀번호는 8자 이상 16자 이하으로
              구성되어야 합니다.
            </InvalidInput>
          )}
          {pwdErrorSpecial && newPwd && (
            <InvalidInput>
              ❌&nbsp;하나 이상의 문자, 하나의 숫자 및
              하나의 특수 문자를 포함해야합니다.
            </InvalidInput>
          )}
        </Label>
        <Label>
          <label>신규 비밀번호 확인</label>
          <input
            type="password"
            required
            placeholder="비밀번호를 다시 한번 입력하세요"
            value={newPwdValid}
            onChange={onChangeNewPwdValid}
          />
          {!pwdValidError && newPwdValid && (
            <CorrectInput>
              🟢&nbsp;비밀번호가 일치합니다.
            </CorrectInput>
          )}
          {pwdValidError && newPwdValid && (
            <InvalidInput>
              ❌&nbsp;비밀번호와 일치하지 않습니다.
              확인해주세요
            </InvalidInput>
          )}
        </Label>
        <ButtonDiv>
          <CancelBtn onClick={onClickCancelBtn}>
            취소
          </CancelBtn>
          <ChangeBtn onClick={onClickChangeBtn}>
            완료
          </ChangeBtn>
        </ButtonDiv>
      </Form>
    </Container>
  );
};

export default PasswordChangeMain;
