import Cookies from "js-cookie";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Providers } from "./providers";
import { router } from "./Router";
import { useAuthStore } from "./store/auth";
import { useLoadingStore } from "./store/loading";
import { PreLoadPage } from "./components/preLoadPage";
import { User } from "./types/user";

function App() {
    const { setUser, setToken } = useAuthStore();
    const { isLoading, setIsLoading } = useLoadingStore();

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const token = Cookies.get("token");
                const user = Cookies.get("user");
        
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
            } finally {
                // Tunggu sebentar sebelum menghilangkan loading
                await new Promise(resolve => setTimeout(resolve, 2000));
                setIsLoading(false);
            }
        }

        initializeApp();
    }, [setUser, setToken, setIsLoading]);

    // Tampilkan PreLoadPage selama loading
    if (isLoading) {
        return (
            <Providers>
                <PreLoadPage />
            </Providers>
        );
    }

    // Render router setelah loading selesai
    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    );
}

export default App;
