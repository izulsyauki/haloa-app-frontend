import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export function PublicRoute() {
    const user = useAuthStore((state) => state.user)
    if (user){
        return <Navigate to="/" replace/>
    }

    return <Outlet />
}