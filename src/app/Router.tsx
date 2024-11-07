import { createBrowserRouter } from "react-router-dom";
import { HaloaLayout } from "./layouts/HaloaLayout";
import { myRoutes } from "./routes/index";

export const router = createBrowserRouter([
    {   
        element: <HaloaLayout />,
        children: [
            {
                element: <myRoutes.ProtectedRoute />,
                children: [
                    {
                        path: "/",
                        element: <myRoutes.HomeRoute />,
                        errorElement: <myRoutes.ErrorPage />,
                    },
                    {
                        path: "/detail/:postId",
                        element: <myRoutes.PostDetailRoute />,
                        errorElement: <myRoutes.ErrorPage />,
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
                ],
            },
        ],
    },
    {
        element: <myRoutes.PublicRoute />,
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
]);
