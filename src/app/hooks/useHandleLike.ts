import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike } from "../api/like";
import { Thread } from "../types/thread";

export const useHandleLike = () => {
    const queryClient = useQueryClient();

    const mutateAsyncLike = useMutation({
        mutationFn: createLike,
        onMutate: async (threadId) => {
            await queryClient.cancelQueries({ queryKey: ["threads"] });
            await queryClient.cancelQueries({ queryKey: ["thread", threadId] });

            const previousThreads = queryClient.getQueryData(["threads"]);
            const previousThread = queryClient.getQueryData(["thread", threadId]);

            // Dapatkan current thread state
            const currentThreads = queryClient.getQueryData(["threads"]) as Thread[] | undefined;
            const currentThread = currentThreads?.find(t => t.id === threadId);
            const newIsLiked = currentThread ? !currentThread.isLiked : true;

            // Update cache untuk daftar threads
            queryClient.setQueryData(["threads"], (old: Thread[] | undefined) => {
                if (!old) return [];
                return old.map((thread) => {
                    if (thread.id === threadId) {
                        return {
                            ...thread,
                            isLiked: newIsLiked,
                            _count: {
                                ...thread._count,
                                like: newIsLiked ? thread._count.like + 1 : thread._count.like - 1,
                            },
                        };
                    }
                    return thread;
                });
            });

            return { previousThreads, previousThread };
        },
        onError: (err, threadId, context) => {
            if (context?.previousThreads) {
                queryClient.setQueryData(["threads"], context.previousThreads);
            }
            if (context?.previousThread) {
                queryClient.setQueryData(["thread", threadId], context.previousThread);
            }
        },
        onSuccess: (response, threadId) => {
            // Update cache dengan response dari server
            queryClient.setQueryData(["threads"], (old: Thread[] | undefined) => {
                if (!old) return [];
                return old.map((thread) => {
                    if (thread.id === threadId) {
                        return {
                            ...thread,
                            isLiked: (response as { isLiked: boolean }).isLiked,
                            _count: {
                                ...thread._count,
                                like: (response as { likesCount: number }).likesCount,
                            },
                        };
                    }
                    return thread;
                });
            });
        },
    });

    return {
        mutateAsyncLike,
    };
};
