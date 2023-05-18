import { useEffect, useState } from "react";
import * as S from "./DescPlanModal.style";
import { useNavigate } from "react-router-dom";
import { deletePlan, exitPlan, checkAuth } from "utils/api/planApi";
import Swal from "sweetalert2";

const DescPlanModal = ({
  accessToken,
  setDescModalToggle,
  uuid,
  title,
  nickName,
}) => {
  const navigate = useNavigate();
  const [leader, setLeader] = useState(false);

  const handleInitOnClick = () => {
    navigate(`/goplan/${uuid}/${title}/${nickName}`);
  };

  const handleCancelOnClick = () => {
    setDescModalToggle(false);
  };

  useEffect(() => {
    checkAuth(accessToken, uuid).then((res) => setLeader(res.data));
  });

  const handleExitOnClick = () => {
    Swal.fire({
      title: "정말로 퇴장하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "퇴장",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        exitPlan(accessToken, uuid)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "여행 계획에서 퇴장하셨습니다",
                icon: "success",
                confirmButtonText: "확인",
                timer: 3000,
              }).then((res) => {
                setDescModalToggle(false);
                navigate(`/plans`);
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "퇴장도중 에러가 발생했습니다.",
              icon: "error",
              confirmButtonText: "확인",
              timer: 3000,
            });
          });
      }
    });
  };

  const handleDeleteOnClick = () => {
    Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        deletePlan(accessToken, uuid)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "여행 계획이 삭제되었습니다",
                icon: "success",
                confirmButtonText: "확인",
                timer: 3000,
              }).then(() => {
                setDescModalToggle(false);
                navigate(`/plans`);
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "삭제도중 에러가 발생했습니다.",
              icon: "error",
              confirmButtonText: "확인",
              timer: 3000,
            });
          });
      }
    });
  };

  return (
    <S.ModalWrapper>
      <S.ModalFormDiv>
        <S.CustomH1>{title}</S.CustomH1>
        <S.CustomHr />
        <S.ButtonDiv>
          <S.AddButton onClick={handleInitOnClick}>입장</S.AddButton>
          {leader === "LEADER" ? (
            <S.CancelButton onClick={handleDeleteOnClick}>삭제</S.CancelButton>
          ) : (
            <S.ExitButton onClick={handleExitOnClick}>방나가기</S.ExitButton>
          )}
          <S.CancelButton onClick={handleCancelOnClick}>취소</S.CancelButton>
        </S.ButtonDiv>
      </S.ModalFormDiv>
    </S.ModalWrapper>
  );
};

export default DescPlanModal;
