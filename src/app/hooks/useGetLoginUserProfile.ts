import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../api/profile";
import { User } from "../types/user";

export const useGetLoginUserProfile = () => {
    const {data: userProfile, isLoading: isLoadingProfile } = useQuery<User>({
        queryKey: ["userProfile"],
        queryFn: async () => {
            return await getProfileData();
        },
    });

    return { userProfile, isLoadingProfile };  
};
