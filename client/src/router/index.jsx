import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import ErrorHandler from "../pages/ErrorHandlerPage";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
