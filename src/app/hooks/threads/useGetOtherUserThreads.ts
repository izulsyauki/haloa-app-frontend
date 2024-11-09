import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOtherUserThreads } from "../../api/thread";
import { Thread } from "../../types/thread";
import { useEffect } from "react";

export const useGetOtherUserThreads = (userId: number) => {
    const queryClient = useQueryClient();

    const { data: otherUserThreadQuery , refetch: refetchOtherUserThreads} = useQuery({
        queryKey: ["otherUserThreads", userId],
        queryFn: async () => {
            try {
                const otherUserThread = await getOtherUserThreads(userId);
                
                // Sinkronkan dengan data threads yang ada
                const existingThreads = queryClient.getQueryData<Thread[]>(["threads"]);
                
                if (existingThreads && otherUserThread) {
                    // Update status like dari cache threads yang ada
                    return otherUserThread.map(otherUserThread => {
                        const existingThread = existingThreads.find(t => t.id === otherUserThread.id);
                        if (existingThread) {
                            return {
                                ...otherUserThread,
                                isLiked: existingThread.isLiked,
                                _count: existingThread._count
                            };
                        }
                        return otherUserThread;
                    });
                }
                
                return otherUserThread;
            } catch (error) {
                console.error("Error fetching user threads:", error);
                throw error;
            }
        },
        staleTime: 0, // Set ke 0 agar selalu refetch
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        // Refetch data saat postId berubah
        if (userId) {
            refetchOtherUserThreads();
        }
    }, [userId, refetchOtherUserThreads]);
    
    return { otherUserThreadQuery, refetchOtherUserThreads };
};