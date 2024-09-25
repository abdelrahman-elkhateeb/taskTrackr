import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import Home from "../Home/Home";
import AppLayout from "../layout/Layout";
import Error from "../Ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
