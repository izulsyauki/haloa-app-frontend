import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, RouterProvider } from "react-router-dom";
import { Providers } from "./providers";
import { router } from "./Router";
import { PreLoadPageRoute } from "./routes/PreLoadPageRoute";
import { useAuthStore } from "./store/auth";
import { useLoadingStore } from "./store/loading";
import { User } from "./types/user";

function App() {
    const { setUser, setToken } = useAuthStore();
    const { isLoading, setIsLoading } = useLoadingStore();
    const [error, setError] = useState<{ status?: number } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const initializeApp = async () => {
            try {

                const token = Cookies.get("token");
                const user = Cookies.get("user");
                
                // Cek token dan user
                if (token && user) {
                    setToken(token);
                    setUser(JSON.parse(user) as User);
                } else {
                    setToken("");
                    setUser({} as User);
                }
            } catch (err: unknown) {
                console.error("Error initializing app:", err);
                setToken("");
                setUser({} as User);
                setError({ status: 500 });
            } finally {
                await new Promise(resolve => setTimeout(resolve, 2000));
                setIsLoading(false);
            }
        }

        initializeApp();
    }, [setUser, setToken, setIsLoading]);

    if (error?.status === 500) {
        navigate("/error");
    }

    if (isLoading) {
        return (
            <Providers>
                <PreLoadPageRoute />
            </Providers>
        );
    }

    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    );
}

export default App;
