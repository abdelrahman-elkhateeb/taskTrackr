import { Outlet, useNavigation, useLocation } from "react-router";
import NavBar from "../Ui/NavBar";
import Loader from "../Ui/Loader";

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
      <main className="mx-auto px-4 container">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
