import {
  Container,
  Form,
  Label,
  WithdrawBtn,
} from "./UserWithdrawMain.style";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WITH_DRAW } from "store/slice/userSlice";
import { deleteMember } from "utils/api/sessionApi";
import Swal from "sweetalert2";

const UserWithdrawMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

  const onClickWithdrawBtn = () => {
    Swal.fire({
      title: "정말 탈퇴하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        // 회원탈퇴 요청
        deleteMember(accessToken).then((res) => {
          Swal.fire({
            title: "성공적으로 탈퇴하였습니다.",
            icon: "success",
            confirmButtonText: "확인",
            timer: 3000,
          });

          dispatch(WITH_DRAW());
          navigate("/");
        });
      } else {
      }
    });
  };

  return (
    <Container>
      <Form>
        <Label>회원 탈퇴를 도와드릴까요?</Label>
        <WithdrawBtn onClick={onClickWithdrawBtn}>
          회원 탈퇴
        </WithdrawBtn>
      </Form>
    </Container>
  );
};

export default UserWithdrawMain;
