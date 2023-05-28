import * as S from "./GoPlanHeader.style";
import { Link } from "react-router-dom";
const GoPlanHeader = ({ setShareModalToggle, listener }) => {
  //비구조화할당(destructuring)
  const handleShareOnClick = () => {
    setShareModalToggle(true);
  };
  return (
    <>
      <S.HeaderWrapper>
        <Link to="/plans">
          <S.QuitButton>나가기</S.QuitButton>
        </Link>
        <S.ShareButton onClick={handleShareOnClick}>링크 공유</S.ShareButton>
        <S.PDFButton onClick={listener}>PDF 다운로드 받기</S.PDFButton>
      </S.HeaderWrapper>
    </>
  );
};

export default GoPlanHeader;
