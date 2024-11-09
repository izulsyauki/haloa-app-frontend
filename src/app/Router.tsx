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
                    },
                    {
                        path: "/follows",
                        element: <myRoutes.FollowsRoute />,
                    },
                    {
                        path: "/profile",
                        element: <myRoutes.ProfileRoute />,
                    },
                    {
                        path: "/user/detail/:id",
                        element: <myRoutes.DetailProfileRoute />,
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
