import API from "../libs/axios";
import { User } from "../types/user";
interface UserProfileResponse {
    profile: User;
}

export const getProfileData = async () => {
    return await API.get<UserProfileResponse>("/auth/me").then((res) => res.data).then((data) => data.profile);
};
