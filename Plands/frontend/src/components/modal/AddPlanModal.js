import { useState } from "react";
import * as S from "./AddPlanModal.style";
import { createPlan } from "utils/api/planApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const AddPlanModal = ({ accessToken, setAddModalToggle }) => {
  const [planName, setPlanName] = useState("");
  const navigate = useNavigate();

  const handleAddOnClick = (event) => {
    createPlan(accessToken, {
      title: planName,
    })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "성공적으로 생성되었습니다!",
            icon: "success",
            confirmButtonText: "확인",
            timer: 3000,
          }).then(() => {
            setAddModalToggle(false);
            // navigate(`/plans`);
          });
        }
      })
      .catch((error) =>
        Swal.fire({
          title: "이미 동일한 이름의 여행계획이 존재합니다!",
          text: "다시 시도해주세요!",
          icon: "error",
          confirmButtonText: "확인",
          timer: 3000,
        })
      );
  };

  const handleCanCelOnClick = () => {
    setAddModalToggle(false);
  };

  return (
    <S.ModalWrapper>
      <S.ModalFormDiv>
        <S.CustomH1>여행 계획 생성</S.CustomH1>
        <S.CustomHr />
        <S.CustomH1>여행 제목</S.CustomH1>
        <S.CustomInput
          type="text"
          value={planName}
          onChange={(event) => setPlanName(event.target.value)}
        />
        <S.ButtonDiv>
          <S.AddButton onClick={handleAddOnClick}>추가</S.AddButton>
          <S.CancelButton onClick={handleCanCelOnClick}>취소</S.CancelButton>
        </S.ButtonDiv>
      </S.ModalFormDiv>
    </S.ModalWrapper>
  );
};

export default AddPlanModal;
