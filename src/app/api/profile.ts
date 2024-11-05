import API from "../libs/axios";
import { User } from "../types/user";

interface UserProfileResponse {
    profile: User;
    message: string;
}

export const getProfileData = async () => {
    try {
        const response = await API.get<UserProfileResponse>("/auth/me");
        
        if (response.status === 204) {
            // Jika no content, tunggu sebentar dan coba fetch ulang
            await new Promise(resolve => setTimeout(resolve, 200));
            const retryResponse = await API.get<UserProfileResponse>("/auth/me");
            return retryResponse.data.profile;
        }
        
        return response.data.profile;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};

export const updateProfileData = async (formData: FormData) => {
    const response = await API.put<UserProfileResponse>("/profile", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    // Jika status 204, fetch ulang data profile
    if (response.status === 204) {
        return await getProfileData();
    }

    return response.data;
};
