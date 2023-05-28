import Nav from "../../components/nav/Nav";
import MyPageTitle from "../../components/mypage/MyPageTitle/MyPageTitle";
import MyPageNav from "../../components/mypage/MyPageNav/MyPageNav";
import UserWithdrawMain from "components/mypage/UserWithdrawMain/UserWithdrawMain";
import { NavAndMain } from "./UserWithdrawPage.style";

const UserWithdrawPage = () => {
  return (
    <div>
      <Nav />
      <MyPageTitle />
      <NavAndMain>
        <MyPageNav />
        <UserWithdrawMain />
      </NavAndMain>
    </div>
  );
};

export default UserWithdrawPage;
