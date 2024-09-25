import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import Home from "../home/Home";
import AppLayout from "../layout/Layout";
import Error from "../Ui/Error";
import Tasks from "../tasks/Tasks";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/tasks", element: <Tasks /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
