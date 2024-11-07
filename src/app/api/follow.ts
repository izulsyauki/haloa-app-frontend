// import { AxiosRequestConfig } from "axios";
import API from "../libs/axios";

export const getFollowCounts = async () => {
    const response = await API.get("/follow/count");
    return response.data;
};

export const followUser = async (userId: number): Promise<void> => {
    try {
        await API.post(`/follow`, { followingId: userId });
    } catch (error) {
        console.error('Error following user:', error);
        throw error;
    }
};

// interface UnfollowRequest {
//    data: { followingId: number };
// }

export const unfollowUser = async (userId: number): Promise<void> => {
    try {
        // const config: AxiosRequestConfig<UnfollowRequest> = {
        //     data: { followingId: userId }
        // }

        await API.delete(`/follow/${userId}`);
    } catch (error) {
        console.error('Error unfollowing user:', error);
        throw error;
    }
};

export const getFollowers = async () => {
    try {
        const response = await API.get("/follow/followers");
        return response.data;
    } catch (error) {
        console.error('Error getting followers:', error);
        throw error;    
    }
};

export const getFollowing = async () => {
    try {
        const response = await API.get("/follow/following");
        return response.data;
    } catch (error) {
        console.error('Error getting following:', error);
        throw error;
    }
}
