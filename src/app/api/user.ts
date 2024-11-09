import API from '../libs/axios';
import { User } from '../types/user';

export const getSuggestedUsers = async (limit: number = 5): Promise<User[]> => {
    try {
        const response = await API.get(`/user/suggested?limit=${limit}`);
        return response.data as User[];
    } catch (error) {
        console.error('Error fetching suggested users:', error);
        throw error;
    }
};

export const followUser = async (userId: number): Promise<void> => {
    try {
        await API.post(`/follows`, { followingId: userId });
    } catch (error) {
        console.error('Error following user:', error);
        throw error;
    }
};

export const unfollowUser = async (userId: number): Promise<void> => {
    try {
        await API.delete(`/follows/${userId}`);
    } catch (error) {
        console.error('Error unfollowing user:', error);
        throw error;
    }
};

export const getDetailUser = async (userId: number): Promise<User> => {
    try {
        const response = await API.get(`/user/detail/${userId}`);
        return response.data as User;
    } catch (error) {
        console.error("Error in getDetailUser:", error);
        throw error;
    }
};