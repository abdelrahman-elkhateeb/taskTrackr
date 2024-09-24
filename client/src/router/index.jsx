import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import ErrorHandler from "../pages/ErrorHandlerPage";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Singup from "../pages/Singup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
       

      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/singup" element={<Singup />} />

      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
