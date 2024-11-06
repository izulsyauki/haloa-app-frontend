import Cookies from "js-cookie";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Providers } from "./providers";
import { router } from "./Router";
import { useAuthStore } from "./store/auth";

function App() {
    const { setUser, setToken } = useAuthStore();

    useEffect(() => {
        const token = Cookies.get("token");
        const user = Cookies.get("user");

        if (token && user) {
            setToken(token);
            setUser(JSON.parse(user));
        }
    }, [setUser, setToken]);

    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    );
}

export default App;
