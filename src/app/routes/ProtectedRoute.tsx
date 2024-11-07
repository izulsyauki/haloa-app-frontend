import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useGetLoginUserProfile } from "../hooks/auth/useGetLoginUserProfile";
import Cookies from "js-cookie";

export function ProtectedRoute() {
    const { user, token } = useAuthStore();
    const cookieToken = Cookies.get("token");
    const cookieUser = Cookies.get("user");
    const { isErrorProfile  } = useGetLoginUserProfile();
    const location = useLocation();
    const isResetPassword = location.pathname.includes("/reset-password");


    if ((!user || !token || !cookieToken || !cookieUser || isErrorProfile) && !isResetPassword) {
            return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
}
