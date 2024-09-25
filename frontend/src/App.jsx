import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/Login/Login";
import Register from "./features/register/Register";
import Home from "./features/Home/Home";
import AppLayout from "./features/Ui/AppLayout";
import Error from "./features/Ui/Error";

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
function App() {
  return <RouterProvider router={router} />;
}

export default App;
