import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getProfileData } from "../../api/profile";
import { useAuthStore } from "../../store/auth";
import { UserProfile } from "../../types/user";

interface UserProfileWithCount extends UserProfile {
  _count: {
    following: number;
    follower: number;
  };
}

export const useGetLoginUserProfile = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const queryClient = useQueryClient();

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
                const data = await getProfileData();
                return data;
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

    const updateFollowCount = (type: 'increment' | 'decrement') => {
        queryClient.setQueryData<UserProfileWithCount>(["userProfile"], (oldData) => {
            if (!oldData) return oldData;
            const count = type === 'increment' ? 1 : -1;
            return {
                ...oldData,
                _count: {
                    ...oldData._count,
                    following: Math.max((oldData._count?.following || 0) + count, 0)
                }
            };
        });
    };

    return { 
        userProfile, 
        isLoadingProfile, 
        isErrorProfile, 
        isFetchedProfile, 
        isFetchingProfile, 
        refetchProfile,
        updateFollowCount 
    };
}; 
