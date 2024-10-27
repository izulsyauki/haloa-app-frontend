import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export function ProtectedRoute() {
    const { user, token } = useAuthStore();
    if (!user || !token) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
}
