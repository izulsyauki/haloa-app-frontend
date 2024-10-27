import API from "../libs/axios";

export const getProfile = async () => {
    const response = await API.get("/auth/me")
    return response.data;
}
