import { useQuery } from "@tanstack/react-query";
import { getThreads } from "../../api/thread";

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
        staleTime: 1000 * 30,
        gcTime: 1000 * 60,
        refetchOnWindowFocus: false,
    });

    return { threads, isLoadingThreads };
};