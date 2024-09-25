import { Outlet, useNavigation } from "react-router";
import NavBar from "../Ui/NavBar";
import Loading from "./Loading";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      {isLoading && <Loading />}
      <NavBar />
      <main className="mx-auto max-w-3xl">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
