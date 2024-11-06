import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Cookies from "js-cookie";
import { useGetLoginUserProfile } from "../hooks/auth/useGetLoginUserProfile";

export function ProtectedRoute() {
    const { user, token } = useAuthStore();
    const cookieToken = Cookies.get("token");
    const cookieUser = Cookies.get("user");
    const { isErrorProfile  } = useGetLoginUserProfile();

    if (!user || !token || !cookieToken || !cookieUser || isErrorProfile) {
            return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
}
