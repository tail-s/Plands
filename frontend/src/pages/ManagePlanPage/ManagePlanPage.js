import { useEffect, useState } from "react";
import Nav from "../../components/nav/Nav";
import { useSelector } from "react-redux";
import PlanCard from "components/plancard/PlanCard";
import * as S from "./ManagePlanPage.style";
import { useNavigate } from "react-router-dom";
import { getPlanList, getPageCount } from "utils/api/planApi";
import Swal from "sweetalert2";
import AddPlanModal from "components/modal/AddPlanModal";
import { chunk } from "utils/util/chunk";
import DescPlanModal from "components/modal/DescPlanModal";
import { getMemberDetail } from "utils/api/memberApi";
const ManagePlanPage = () => {
  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

  const [planList, setPlanList] = useState([]);
  const [addModalToggle, setAddModalToggle] = useState(false);
  const [descModalToggle, setDescModalToggle] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [nickName, setNickName] = useState("");
  const [offset, setOffset] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [pageBtns, setPageBtns] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getMemberDetail(accessToken).then((res) => {
      setNickName(res.data.nickname);
    });
  }, [accessToken]);

  const makePagination = (pageNum) => {
    const temp = [];
    for (let i = 0; i < pageNum; i++) {
      temp.push(i + 1);
    }
    setPageBtns(temp);
  };
  const activePageButtonStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
  };
  useEffect(() => {
    getPageCount(accessToken)
      .then((res) => {
        setPageNum(res.data); // 페이지 개수 설정
      })
      .then(makePagination(pageNum));
  }, [accessToken, pageNum, pageBtns.length, planList]);

  useEffect(() => {
    if (!accessToken) {
      Swal.fire({
        title: "접근 제한",
        text: "로그인 해주세요",
        icon: "error",
        confirmButtonText: "확인",
        timer: 1000,
      }).then(() => navigate("/login"));
    } else {
      getPlanList(accessToken, offset, 6)
        .then((res) => {
          return res;
        })
        .then((res) => {
          const divided = chunk(res.data, 3);
          setPlanList([...divided]);
        });
    }
  }, [accessToken, offset, navigate, addModalToggle, descModalToggle]);

  const handleAddPlanButton = () => {
    // 모달창 띄우고 해당 모달창에서 입력받은 제목으로 생성
    // createPlan()
    setAddModalToggle(!addModalToggle);
  };

  // const handleDescPlanButton = (event) => {
  //   // 모달창 띄우고 해당 모달창에서 입력받은 제목으로 생성
  //   // createPlan()
  //   console.log(event.target);
  //   setSelectedPlan({});
  //   setDescModalToggle(!descModalToggle);
  // };
  return (
    <>
      {addModalToggle && (
        <AddPlanModal
          accessToken={accessToken}
          setAddModalToggle={setAddModalToggle}
        />
      )}
      {descModalToggle && (
        <DescPlanModal
          uuid={selectedPlan.uuid}
          title={selectedPlan.title}
          nickName={nickName}
          accessToken={accessToken}
          setDescModalToggle={setDescModalToggle}
        />
      )}
      {accessToken ? (
        <>
          <Nav />
          <S.ContentWrapper>
            <S.PlanListHeader>
              <S.PlanAddButton onClick={handleAddPlanButton}>
                여행계획 추가하기
              </S.PlanAddButton>
            </S.PlanListHeader>
            <S.PlanListWrapper>
              {planList.map((items) => (
                <S.ItemWrapper>
                  {items.map((item) => (
                    <PlanCard
                      key={item.code}
                      uuid={item.code}
                      title={item.title}
                      createdAt={item.registDate}
                      setDescModalToggle={setDescModalToggle}
                      setSelectedPlan={setSelectedPlan}
                    />
                  ))}
                </S.ItemWrapper>
              ))}
            </S.PlanListWrapper>
            <S.PlanListFooter>
              <S.PageBtnsWrapper>
                {pageBtns.map((element) => (
                  <S.PageBtn
                    key={element}
                    style={element === offset ? activePageButtonStyle : {}}
                    onClick={(e) => setOffset(element - 1)}
                  >
                    {element}
                  </S.PageBtn>
                ))}
              </S.PageBtnsWrapper>
            </S.PlanListFooter>
          </S.ContentWrapper>
        </>
      ) : null}
    </>
  );
};

export default ManagePlanPage;
