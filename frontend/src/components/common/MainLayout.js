import { Outlet } from "react-router-dom";
import Header from "components/header/Header";

const MainLayout = () => {
  return (
    <>
      <Header id="topHeader" />
      <Outlet />
    </>
  );
};

export default MainLayout;
