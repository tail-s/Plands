import Nav from "../../components/nav/Nav";
import Carousel from "components/main/carousel/Carousel";
import * as S from "./MainPage.style";
import ServiceInfo from "components/main/serviceInfo/ServiceInfo";
import SideNavMain from "components/SideNavForMain/SideNavMain";

/*
    <div>
      <Header />
      <Nav />
      <Carousel />
      <ServiceInfo />
    </div>

*/
const MainPage = () => {
  return (
    <div>
      <Nav />
      <Carousel />
      <S.InfoWrapper>
        <ServiceInfo />
        <SideNavMain />
      </S.InfoWrapper>
    </div>
  );
};

export default MainPage;
