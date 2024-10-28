import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Cookies from "js-cookie";

export function ProtectedRoute() {
    const { user, token } = useAuthStore();
    const cookieToken = Cookies.get("token");
    const cookieUser = Cookies.get("user");

    if (!user || !token || !cookieToken || !cookieUser) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
}
