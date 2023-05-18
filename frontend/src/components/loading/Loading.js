import * as S from "./Loading.style";
import Spinner from "../../assets/gif/Fading.gif";
const Loading = () => {
  return (
    <>
      <S.LoadingText>잠시만 기다려 주세요.</S.LoadingText>
      <img src={Spinner} alt="로딩중" width="5%" />
    </>
  );
};

export default Loading;
