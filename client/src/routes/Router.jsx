import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PageNotFound from "../pages/PageNotFound";
import { Suspense } from "react";
import Homepage from "../pages/Homepage";
import { HomepageLoader } from "../utils/HomepageLoader";
const HomePageLoader = () => <div>Loading app...</div>;
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthRoute />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<HomePageLoader />}>
        <Homepage />
      </Suspense>
    ),
    loader: HomepageLoader,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
