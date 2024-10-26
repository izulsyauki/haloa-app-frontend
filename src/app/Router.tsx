import { createBrowserRouter } from "react-router-dom";
import { myRoutes } from "./routes/index";
import { HaloaLayout } from "./layouts/HaloaLayout";

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
                        path: "/post/:postId",
                        element: <myRoutes.PostDetailRoute />,
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
                path: "/reset-password",
                element: <myRoutes.ResetPassRoute />,
            },
        ],
    },
]);
