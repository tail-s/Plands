import TravelPlanTemplate from "components/collaborative/TravelPlanTemplate";
import { useEffect, useState, useRef } from "react";
import VideoSpace from "components/collaborative/VideoSpace";
import GoPlanHeader from "components/collaborative/GoPlanHeader";
import * as S from "./GoPlanPage.style";
import SideNav from "components/collaborative/SideNav";
import { useParams } from "react-router-dom";
import SharePlanModal from "components/modal/SharePlanModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const GoPlanPage = () => {
  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });
  const { uuid, title, nickName } = useParams();
  const [shareModalToggle, setShareModalToggle] = useState(false);

  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(true);
  const printRef = useRef();

  useEffect(() => {
    if (!accessToken) {
      Swal.fire({
        title: "접근 제한",
        text: "로그인 및 회원가입이 필요합니다.",
        icon: "warning",
        confirmButtonText: "확인",
        timer: 3000,
      }).then(() => navigate(`/login/${uuid}`));
    }
  }, [accessToken, navigate, uuid]);

  const generate = () => {
    setIsShow(false);
    setTimeout(async () => {
      const element = printRef.current;

      // CaptureHTML(element, "result", { proxy : "/html2canvas/proxy.json"});
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        unit: "mm",
        format: "a1",
      });
      pdf.addImage(data, "PNG", 0, 0, 600, 850);
      pdf.save("print.pdf");
    }, 1);
    setTimeout(() => {
      setIsShow(true);
    }, 2);
  };

  return (
    <div>
      <>
        {shareModalToggle && (
          <SharePlanModal
            accessToken={accessToken}
            setShareModalToggle={setShareModalToggle}
            uuid={uuid}
          />
        )}
        {accessToken ? (
          <S.MainContent>
            <S.StickySpace>
              <GoPlanHeader
                title={title}
                setShareModalToggle={setShareModalToggle}
                listener={generate}
              />
              <VideoSpace mySessionId={uuid} myUserName={nickName} />
            </S.StickySpace>
            <S.ContentSpace>
              <S.PdfWrapper ref={printRef}>
                <TravelPlanTemplate room={uuid} isShow={isShow} />
              </S.PdfWrapper>
              <SideNav />
            </S.ContentSpace>
          </S.MainContent>
        ) : null}
      </>
    </div>
  );
};

export default GoPlanPage;
