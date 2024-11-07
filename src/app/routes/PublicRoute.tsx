import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export function PublicRoute() {
    const { token } = useAuthStore();
    const location = useLocation();
    const isResetPassword = location.pathname.includes("/reset-password");

    // Jika ada token dan bukan halaman reset password, redirect ke home
    if (token && !isResetPassword) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}