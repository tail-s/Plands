import { useEffect, useState } from "react";
import * as S from "./PlanCard.style";

function PlanCard({
  uuid,
  createdAt,
  title,
  setDescModalToggle,
  setSelectedPlan,
}) {
  const [newer, setNewer] = useState(false);

  useEffect(() => {
    const current = new Date();
    const date = new Date(createdAt);

    const diff = current - date; // 두 시간 간의 차이 (밀리초 단위)

    const hour = 60 * 60 * 1000; // 1시간을 밀리초로 계산

    if (diff < hour) setNewer(true);
  }, [createdAt]);

  const handlePlancardOnClick = (event) => {
    // 여기서 모달 띄워서 입장 삭제 버튼 구현
    // 삭제의 경우에는 leader인 경우에만 표시
    // 입장 시에는 뒤에 uuid 붙여서 라우팅\
    setDescModalToggle(true);
    setSelectedPlan({ uuid, title });
  };
  return (
    <S.PlanWrapper onClick={handlePlancardOnClick}>
      <S.PlanCardHeader>
        {newer ? <S.NewTag>new</S.NewTag> : null}
      </S.PlanCardHeader>
      <S.PlanCardBody>
        <S.PlanTitle>{title}</S.PlanTitle>
      </S.PlanCardBody>
      <S.PlanCardFooter></S.PlanCardFooter>
    </S.PlanWrapper>
  );
}

export default PlanCard;
