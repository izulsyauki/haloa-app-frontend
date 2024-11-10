import { createBrowserRouter } from "react-router-dom";
import { HaloaLayout } from "./layouts/HaloaLayout";
import { myRoutes } from "./routes/index";

export const router = createBrowserRouter([
    {   
        element: <HaloaLayout />,
        errorElement: <myRoutes.ErrorPageRoute />,
        children: [
            {
                element: <myRoutes.ProtectedRoute />,
                children: [
                    {
                        path: "/",
                        element: <myRoutes.HomeRoute />,
                        errorElement: <myRoutes.ErrorPageRoute />,
                    },
                    {
                        path: "/detail/:postId",
                        element: <myRoutes.PostDetailRoute />,
                        errorElement: <myRoutes.ErrorPageRoute />,
                    },
                    {
                        path: "/search",
                        element: <myRoutes.SearchUserRoute />,
                        errorElement: <myRoutes.ErrorPageRoute />,
                    },
                    {
                        path: "/follows",
                        element: <myRoutes.FollowsRoute />,
                        errorElement: <myRoutes.ErrorPageRoute />,
                    },
                    {
                        path: "/profile",
                        element: <myRoutes.ProfileRoute />,
                        errorElement: <myRoutes.ErrorPageRoute />,
                    },
                    {
                        path: "/user/detail/:id",
                        element: <myRoutes.DetailProfileRoute />,
                        errorElement: <myRoutes.ErrorPageRoute />,
                    },
                ],
            },
        ],
    },
    {
        element: <myRoutes.PublicRoute />,
        errorElement: <myRoutes.ErrorPageRoute />,
        children: [
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
                path: "/reset-password/:token",
                element: <myRoutes.ResetPassRoute />,
            },
        ],
    },
    {
        path: "*",
        element: <myRoutes.ErrorPageRoute />,
    },
]);
