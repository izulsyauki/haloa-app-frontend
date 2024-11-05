import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserThreads } from "../api/thread";
import { Thread } from "../types/thread";

export const useGetUserThreads = () => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["userThreads"],
        queryFn: async () => {
            try {
                const userThreads = await getUserThreads();
                
                // Sinkronkan dengan data threads yang ada
                const existingThreads = queryClient.getQueryData<Thread[]>(["threads"]);
                
                if (existingThreads && userThreads) {
                    // Update status like dari cache threads yang ada
                    return userThreads.map(userThread => {
                        const existingThread = existingThreads.find(t => t.id === userThread.id);
                        if (existingThread) {
                            return {
                                ...userThread,
                                isLiked: existingThread.isLiked,
                                _count: existingThread._count
                            };
                        }
                        return userThread;
                    });
                }
                
                return userThreads;
            } catch (error) {
                console.error("Error fetching user threads:", error);
                throw error;
            }
        },
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
};