import API from "../libs/axios";

export const createLike = async (threadId: number) => {
    const response = await API.post(`/like`, { threadId });
    return response.data;
};
