import { Outlet, useNavigation, useLocation } from "react-router";
import NavBar from "../Ui/NavBar";
import Loader from "../Ui/Loader";
import { useSelector } from "react-redux";

function AppLayout() {
  const navigation = useNavigation();
  const location = useLocation();
  const isLoading = navigation.state === "loading";
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const hideNavBarRoutes = ["/login", "/register"];
  const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);

  return (
    <div className={`${darkMode ? "bg-dark-bg" : "bg-light-bg"} relative`}>
      {isLoading && <Loader />}
      {shouldShowNavBar && <NavBar />}
      <main className="my-9 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
