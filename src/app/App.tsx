import Cookies from "js-cookie";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { getFollowing } from "./api/follow";
import { Providers } from "./providers";
import { router } from "./Router";
import { useAuthStore } from "./store/auth";
import { useFollowStore } from "./store/follow";
import { Follow } from "./types/user";

function App() {
    const { setUser, setToken } = useAuthStore();
    const { setFollowingIds } = useFollowStore();

    useEffect(() => {
        const token = Cookies.get("token");
        const user = Cookies.get("user");

        if (token && user) {
            setToken(token);
            setUser(JSON.parse(user));
        }
    }, [setUser, setToken]);

    useEffect(() => {
        const initializeFollowingIds = async () => {
            try {
                const followingData = (await getFollowing()) as Follow[];
                const followingIds = followingData
                    .map((follow: Follow) => follow.following!.id)
                    .filter((id): id is number => id !== undefined);
                setFollowingIds(followingIds as number[]);
            } catch (error) {
                console.error("Error initializing following ids:", error);
            }
        };

        initializeFollowingIds();
    }, [setFollowingIds]);

    return (
        <>
            <Providers>
                <RouterProvider router={router} />
            </Providers>
        </>
    );
}

export default App;
