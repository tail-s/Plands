import { useState } from "react";
import * as S from "./AddPlanModal.style";
import { createPlan } from "utils/api/planApi";
import Swal from "sweetalert2";
import { inviteUser } from "utils/api/emailApi";

const SharePlanModal = ({ accessToken, setShareModalToggle, uuid }) => {
  const [email, setEmail] = useState("");

  const handleInviteOnClick = (event) => {
    inviteUser(accessToken, {
      email: email,
      link: `https://i8b109.p.ssafy.io/goplan/${uuid}`,
    })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "초대를 완료했습니다.",
            icon: "success",
            confirmButtonText: "확인",
            timer: 3000,
          }).then(() => {
            setShareModalToggle(false);
          });
        }
      })
      .catch((error) =>
        Swal.fire({
          title: "이미 해당 계획에 참여한 사용자입니다.",
          text: "다시 시도해주세요!",
          icon: "error",
          confirmButtonText: "확인",
        })
      );
  };

  const handleCanCelOnClick = () => {
    setShareModalToggle(false);
  };

  return (
    <S.ModalWrapper>
      <S.ModalFormDiv>
        <S.CustomH1>다른 사용자 초대</S.CustomH1>
        <S.CustomHr />
        <S.CustomH1>이메일</S.CustomH1>
        <S.CustomInput
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <S.ButtonDiv>
          <S.AddButton onClick={handleInviteOnClick}>초대</S.AddButton>
          <S.CancelButton onClick={handleCanCelOnClick}>취소</S.CancelButton>
        </S.ButtonDiv>
      </S.ModalFormDiv>
    </S.ModalWrapper>
  );
};

export default SharePlanModal;
