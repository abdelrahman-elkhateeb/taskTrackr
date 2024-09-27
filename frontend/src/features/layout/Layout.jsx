import { Outlet, useNavigation, useLocation } from "react-router";
import NavBar from "../Ui/NavBar";
import Loader from "../Ui/Loader";
// import Test from "../testDark/Test";

function AppLayout() {
  const navigation = useNavigation();
  const location = useLocation();
  const isLoading = navigation.state === "loading";

  const hideNavBarRoutes = ["/login", "/register"];
  const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);

  return (
    <div>
      {isLoading && <Loader />}
      {shouldShowNavBar && <NavBar />}
      <main className="">
        <Outlet />
        {/* <Test /> */}
      </main>
    </div>
  );
}

export default AppLayout;
