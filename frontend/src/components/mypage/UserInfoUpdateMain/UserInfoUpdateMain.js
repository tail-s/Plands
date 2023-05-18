import { isNumeric } from "validator";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMemberDetail,
  modifyMember,
} from "utils/api/memberApi";
import Swal from "sweetalert2";
import * as T from "../table.style/table.style";
import * as S from "./UserInfoUpdateMain.style";
import { USER_NICKNAME } from "store/slice/userSlice";

const UserInfoUpdateMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [pNumber, setPNumber] = useState("");
  const [email, setEmail] = useState("");

  // const [genderKor, setGenderKor] = useState("");
  // useEffect(() => {
  //   if (gender === "M") {
  //     setGenderKor("남성");
  //   } else {
  //     setGenderKor("여성");
  //   }
  // }, [gender]);

  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

  useEffect(() => {
    getMemberDetail(accessToken).then((res) => {
      setId(res.data.id);
      setName(res.data.name);
      setNickName(res.data.nickname);
      setGender(res.data.gender);
      setBirthDay(res.data.birthDay);
      setPNumber(res.data.pnumber);
      setEmail(res.data.email);
    });
  }, [accessToken]);

  // 유효성 검사 조건들
  const [nameErrorKorean, setNameErrorKorean] =
    useState(false);
  const [nickNameError, setNickNameError] = useState(false);
  const [pNumberError, setPNumberError] = useState(false);

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
  const onChangeNickName = (e) => {
    const cur = e.target.value;
    const nickNameReg =
      /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,10}$/;

    if (!nickNameReg.test(cur)) {
      setNickNameError(true);
    } else {
      setNickNameError(false);
    }

    setNickName(cur);
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

  const validation = () => {
    if (nameErrorKorean) {
      return false;
    } else if (nickNameError) {
      return false;
    } else if (pNumberError) {
      return false;
    } else if (gender === "") {
      return false;
    } else {
      return true;
    }
  };

  const onClickUpdateBtn = () => {
    if (!validation()) {
      Swal.fire({
        title: "조건에 맞추어 다시 입력해주세요.",
        icon: "error",
        confirmButtonText: "확인",
        timer: 3000,
      });

      return;
    } else {
      modifyMember(accessToken, {
        name: name,
        nickname: nickName,
        gender: gender,
        birthDay: birthDay,
        pnumber: pNumber,
      })
        .then((res) => {
          Swal.fire({
            title: "회원 정보 수정이 완료되었습니다.",
            icon: "success",
            confirmButtonText: "확인",
            timer: 3000,
          });

          dispatch(USER_NICKNAME(nickName));

          navigate("/mypage");
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  const onClickCancelBtn = () => {
    navigate("/mypage");
  };

  return (
    <S.Container>
      <T.table>
        <T.tr>
          <T.td>
            <label>ID</label>
          </T.td>
          <T.td>
            <input type="text" value={id} disabled />
          </T.td>
        </T.tr>
        <T.tr>
          <T.td>
            <label>NAME</label>
          </T.td>
          <T.td>
            <input
              type="text"
              id="input"
              required
              value={name}
              onChange={onChangeName}
            />
            {!nameErrorKorean && name && (
              <S.CorrectInput>
                🟢&nbsp;올바른 입력입니다.
              </S.CorrectInput>
            )}
            {nameErrorKorean && name && (
              <S.InvalidInput>
                ❌&nbsp;이름은 한글로 1~5자까지
                입력가능합니다.
              </S.InvalidInput>
            )}
          </T.td>
        </T.tr>
        <T.tr>
          <T.td>
            <label>NICKNAME</label>
          </T.td>
          <T.td>
            <input
              type="text"
              id="input"
              required
              value={nickName}
              onChange={onChangeNickName}
            />
            {!nickNameError && nickName && (
              <S.CorrectInput>
                🟢&nbsp;올바른 입력입니다.
              </S.CorrectInput>
            )}
            {nickNameError && nickName && (
              <S.InvalidInput>
                ❌&nbsp;닉네임은 한글,영어,숫자(최대10자)
                이루어져야합니다.
              </S.InvalidInput>
            )}
          </T.td>
        </T.tr>
        <T.tr>
          <T.td>
            <label>GENDER</label>
          </T.td>
          <T.td>
            <select
              name="gender"
              id="genderSelect"
              value={gender}
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
          </T.td>
        </T.tr>
        <T.tr>
          <T.td>
            <label id="label">BIRTHDAY</label>
          </T.td>
          <T.td>
            <input
              type="text"
              id="input"
              required
              value={birthDay}
              onChange={(e) => {
                setBirthDay(e.target.value);
              }}
            />
          </T.td>
        </T.tr>
        <T.tr>
          <T.td>
            <label id="label">PHONE NUMBER</label>
          </T.td>
          <T.td>
            <div>
              <input
                type="text"
                id="input"
                required
                value={pNumber}
                onChange={onChangePNumber}
              />
              {!pNumberError && pNumber && (
                <S.CorrectInput>
                  🟢&nbsp;올바른 입력입니다.
                </S.CorrectInput>
              )}
              {pNumberError && pNumber && (
                <S.InvalidInput>
                  ❌&nbsp; 번호 숫자만 입력해주세요.
                </S.InvalidInput>
              )}
            </div>
          </T.td>
        </T.tr>
        <T.tr>
          <T.td>
            <label id="label">EMAIL</label>
          </T.td>
          <T.td>
            <input type="text" value={email} disabled />
          </T.td>
        </T.tr>
      </T.table>
      <S.ButtonDiv>
        <S.UpdateBtn onClick={onClickUpdateBtn}>
          수정 완료
        </S.UpdateBtn>
        <S.CancelBtn onClick={onClickCancelBtn}>
          취소
        </S.CancelBtn>
      </S.ButtonDiv>
    </S.Container>
  );
};

export default UserInfoUpdateMain;
