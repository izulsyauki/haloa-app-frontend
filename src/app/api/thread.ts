import API from "../libs/axios";
import { CreateThreadRequest, Thread } from "../types/thread";

export const getThreads = async () => {
    return await API.get<Thread[]>("/threads").then((res) => res.data);
};

export const createThread = async (data: CreateThreadRequest) => {
    const formData = new FormData();
    formData.append("content", data.content);

    if (data.media && data.media.length > 0) {
        data.media.forEach((file) => {
            formData.append("media", file);
        });
    }

    const response = await API.post("/threads", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const getUserThreads = async () => {
    return await API.get<Thread[]>("/threads/user-threads").then((res) => res.data);
}
