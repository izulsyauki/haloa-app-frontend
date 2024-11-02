import { useQuery } from "@tanstack/react-query";
import { getThreads } from "../api/thread";

export const useGetThreadsFeeds = () => {
    const { data: threads, isLoading: isLoadingThreads } = useQuery({
        queryKey: ["threads"],
        queryFn: async () => {
            try {
                return await getThreads();
            } catch (error) {
                console.error("Error fetching threads:", error);
                throw error;
            }
        },
    });

    return { threads, isLoadingThreads };
};