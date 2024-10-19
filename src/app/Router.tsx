import { createBrowserRouter } from "react-router-dom";
import { myRoutes } from "./routes/index";
import { HaloaLayout } from "./layouts/HaloaLayout";

export const router = createBrowserRouter([
  {
    element: <HaloaLayout />,
    children: [
      {
        path: "/",
        element: <myRoutes.Home />,
        errorElement: <myRoutes.ErrorPage />,
      },
      {
        path: "/search",
        element: <myRoutes.SearchUserRoute />
      },
    ],
  },
  {
    path: "/sign-in",
    element: <myRoutes.SigninRoute />,
  },
  {
    path: "/sign-up",
    element: <myRoutes.SignupRoute />,
  },
  {
    path: "/forgot-password",
    element: <myRoutes.ForgotPassRoute />,
  },
  {
    path: "/reset-password",
    element: <myRoutes.ResetPassRoute />,
  },
]);
