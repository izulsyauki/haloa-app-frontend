import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Cookies from "js-cookie";

export function PublicRoute() {
    const user = useAuthStore((state) => state.user)
    const cookieToken = Cookies.get("token");
    const cookieUser = Cookies.get("user");

    if (user || cookieToken || cookieUser){
        return <Navigate to="/" replace/>
    }

    return <Outlet />
}