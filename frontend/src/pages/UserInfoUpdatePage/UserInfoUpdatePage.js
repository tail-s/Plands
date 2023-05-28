import Nav from "../../components/nav/Nav";
import MyPageTitle from "../../components/mypage/MyPageTitle/MyPageTitle";
import MyPageNav from "../../components/mypage/MyPageNav/MyPageNav";
import UserInfoUpdateMain from "components/mypage/UserInfoUpdateMain/UserInfoUpdateMain";
import { NavAndMain } from "./UserInfoUpdatePage.style";

const UserInfoUpdatePage = () => {
  return (
    <div>
      <Nav />
      <MyPageTitle />
      <NavAndMain>
        <MyPageNav />
        <UserInfoUpdateMain />
      </NavAndMain>
    </div>
  );
};

export default UserInfoUpdatePage;
