import Nav from "../../components/nav/Nav";
import HAN from "assets/images/HAN.jpg";
import JIN from "assets/images/JIN.PNG";
import HAK from "assets/images/HAK.jpg";
import CHAN from "assets/images/CHAN.jpg";
import MIN from "assets/images/MIN.jpg";
import * as S from "./AboutPage.style";

const AboutPage = () => {
  return (
    <div>
      <Nav />
      <S.Container>
        <S.Table>
          <S.Tr>
            <S.ProfileTd>
              <S.ProfileImg src={HAN} alt="HAN" />
            </S.ProfileTd>
            <S.Info>팀장 FE 김성한</S.Info>
            <S.InfoDetail>
              프로젝트 총괄 및 기획
              <br />
              OpenVidu & Y.js 컴포넌트 설계 및 구현
              <br />
              시스템 설계 구축 및 배포
            </S.InfoDetail>
          </S.Tr>
          <S.Tr>
            <S.ProfileTd>
              <S.ProfileImg src={HAK} alt="HAK" />
            </S.ProfileTd>
            <S.Info>팀원 BE 이상학</S.Info>
            <S.InfoDetail>
              Spring 초기 셋팅
              <br />
              Spring Security
              <br />
              API & Jwt 구현
              <br />
              Redis
              <br />
              Docker
            </S.InfoDetail>
          </S.Tr>
          <S.Tr>
            <S.ProfileTd>
              <S.ProfileImg src={JIN} alt="JIN" />
            </S.ProfileTd>
            <S.Info>팀원 BE 김소진</S.Info>
            <S.InfoDetail>
              Jwt & Spring Security
              <br />
              OpenVidu & WebRTC
            </S.InfoDetail>
          </S.Tr>
          <S.Tr>
            <S.ProfileTd>
              <S.ProfileImg src={CHAN} alt="CHAN" />
            </S.ProfileTd>
            <S.Info>팀원 FE 배성찬</S.Info>
            <S.InfoDetail>
              컴포넌트 설계
              <br />
              회원가입 및 로그인 인증
              <br />
              전체 회원 관리 및 API 연결
            </S.InfoDetail>
          </S.Tr>
          <S.Tr>
            <S.ProfileTd>
              <S.ProfileImg src={MIN} alt="MIN" />
            </S.ProfileTd>
            <S.Info>팀원 BE 김경민</S.Info>
            <S.InfoDetail>
              CI/CD 파이프라인 구축
              <br />
              API 설계
              <br />
              Spring Security
              <br />
              영상 편집
            </S.InfoDetail>
          </S.Tr>
        </S.Table>
      </S.Container>
    </div>
  );
};

export default AboutPage;
