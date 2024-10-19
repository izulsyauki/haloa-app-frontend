import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export function ProtectedRoutes() {
    const user = useAuthStore((state) => state.user)
    if (!user){
        return <Navigate to="/sign-in" replace/>
    }

    return <Outlet />
}