import API from "../libs/axios";
import { CreateThreadRequest, Thread, ThreadDetail } from "../types/thread";

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

export const getThreadDetail = async (threadId: number) => {
    return await API.get<ThreadDetail>(`/threads/detail/${threadId}`).then((res) => res.data);
}

// Tambahkan interface untuk parameter createReply
interface CreateReplyParams {
    formData: FormData;
    threadId: number;
}

// Ubah fungsi createReply
export const createReply = async ({ formData, threadId }: CreateReplyParams) => {
    return await API.post(`/threads/${threadId}/replies`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then((res) => res.data);
}
