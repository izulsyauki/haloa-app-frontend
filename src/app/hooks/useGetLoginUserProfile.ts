import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../api/profile";
import { User } from "../types/user";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export const useGetLoginUserProfile = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const {data: userProfile, isLoading: isLoadingProfile, isError: isErrorProfile, isFetched: isFetchedProfile, isFetching: isFetchingProfile} = useQuery<User>({
        queryKey: ["userProfile"],
        queryFn: async () => {
            try {
                return await getProfileData();
            } catch (error: unknown) {
                if ((error as { response?: { status: number } })?.response?.status === 401) {
                    Cookies.remove("token");
                    Cookies.remove("user");
                    logout();
                    navigate("/sign-in");
                }
                throw error;
            }
        },
    });

    return { userProfile, isLoadingProfile, isErrorProfile, isFetchedProfile, isFetchingProfile };
}; 
