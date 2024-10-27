import API from "../libs/axios";

export const getFollowCounts = async () => {
    const response = await API.get("/follow/count");
    return response.data;
};

