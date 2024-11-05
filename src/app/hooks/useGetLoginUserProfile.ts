import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getProfileData } from "../api/profile";
import { useAuthStore } from "../store/auth";

export const useGetLoginUserProfile = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const { 
        data: userProfile, 
        isLoading: isLoadingProfile, 
        isError: isErrorProfile,
        isFetched: isFetchedProfile,
        isFetching: isFetchingProfile,
        refetch: refetchProfile 
    } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            try {
                return await getProfileData();
            } catch (error: unknown) {
                // Handle 401 unauthorized
                if ((error as { response?: { status: number } })?.response?.status === 401) {
                    Cookies.remove("token");
                    Cookies.remove("user");
                    logout();
                    navigate("/sign-in");
                }
                throw error;
            }
        },
        staleTime: 1000 * 60, // Set staleTime ke 1 menit
        gcTime: 1000 * 60 * 5, // Cache 5 menit
        refetchOnMount: "always", // Selalu refetch saat mount
        refetchOnWindowFocus: true,
        retry: (failureCount, error) => {
            // Jangan retry untuk error 401
            if ((error as { response?: { status: number } })?.response?.status === 401) {
                return false;
            }
            return failureCount < 2;
        },
        retryDelay: 1000
    });

    return { 
        userProfile, 
        isLoadingProfile, 
        isErrorProfile, 
        isFetchedProfile, 
        isFetchingProfile, 
        refetchProfile 
    };
}; 
