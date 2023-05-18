import Nav from "../../components/nav/Nav";
import MyPageTitle from "../../components/mypage/MyPageTitle/MyPageTitle";
import MyPageNav from "../../components/mypage/MyPageNav/MyPageNav";
import MyPageMain from "../../components/mypage/MyPageMain/MyPageMain";
import { NavAndMain } from "./MyPage.style";

const MyPage = () => {
  return (
    <div>
      <Nav />
      <MyPageTitle />
      <NavAndMain>
        <MyPageNav />
        <MyPageMain />
      </NavAndMain>
    </div>
  );
};

export default MyPage;
