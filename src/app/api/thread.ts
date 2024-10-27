import API from "../libs/axios";
import { Thread } from "../types/thread";

export const getThread = async (): Promise<Thread[]> => {
    const response = await API.get<Thread[]>("/threads");
    return response.data as Thread[];
};
