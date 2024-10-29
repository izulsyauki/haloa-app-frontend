import API from "../libs/axios";
import { Thread } from "../types/thread";

export const getThreads = async () => {
    return await API.get<Thread[]>("/threads").then((res) => res.data);
};
