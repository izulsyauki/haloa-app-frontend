import {
    createBrowserRouter,
} from "react-router-dom";
import { myRoutes } from "./routes/index";


export const router = createBrowserRouter ([
    {
        path: "/",
        element: <myRoutes.Home />,
        errorElement: <myRoutes.ErrorPage />
    },
    {
        path: "/sign-in",
        element: <myRoutes.SigninRoute />
    },
    {
        path: "/sign-up",
        element: <myRoutes.SignupRoute />,
    },
    {
        path: "/forgot-password",
        element: <myRoutes.ForgotPassRoute />,
    }
]);