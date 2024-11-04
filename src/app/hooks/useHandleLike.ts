import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike } from "../api/like";
import { Thread, ThreadDetail } from "../types/thread";

export const useHandleLike = () => {
    const queryClient = useQueryClient();

    const mutateAsyncLike = useMutation({
        mutationFn: createLike,
        onMutate: async (threadId: number) => {
            // Batalkan queries yang sedang berjalan
            await Promise.all([
                queryClient.cancelQueries({ queryKey: ["threads"] }),
                queryClient.cancelQueries({ queryKey: ["thread"] })
            ]);

            // Simpan state sebelumnya
            const previousThreads = queryClient.getQueryData<Thread[]>(["threads"]);
            const previousThread = queryClient.getQueryData<ThreadDetail>(["thread", threadId.toString()]);

            // Fungsi helper untuk update like status
            const updateLikeStatus = <T extends Thread | ThreadDetail>(item: T): T => ({
                ...item,
                isLiked: !item.isLiked,
                _count: {
                    ...item._count,
                    like: item.isLiked ? item._count.like - 1 : item._count.like + 1,
                    replies: item._count.replies,
                },
            });

            // Update cache untuk threads list
            queryClient.setQueriesData({ queryKey: ["threads"] }, (old: Thread[] | undefined) => {
                if (!old) return [];
                return old.map((thread) => 
                    thread.id === threadId ? updateLikeStatus(thread) : thread
                );
            });

            // Update cache untuk thread detail
            queryClient.setQueriesData({ queryKey: ["thread"] }, (old: ThreadDetail | undefined) => {
                if (!old) return undefined;

                // Jika ini thread utama
                if (old.id === threadId) {
                    return updateLikeStatus(old);
                }

                // Jika ini thread dengan replies
                return {
                    ...old,
                    replies: old.replies?.map((reply) =>
                        reply.id === threadId ? updateLikeStatus(reply) : reply
                    ),
                };
            });

            return { previousThreads, previousThread };
        },

        onError: (err, threadId, context) => {
            // Rollback jika error
            if (context?.previousThreads) {
                queryClient.setQueryData(["threads"], context.previousThreads);
            }
            if (context?.previousThread) {
                queryClient.setQueryData(["thread", threadId.toString()], context.previousThread);
            }
        },

        onSettled: (_data, error) => {
            // Invalidate dan refetch hanya jika ada error
            if (error) {
                queryClient.invalidateQueries({ queryKey: ["threads"] });
                queryClient.invalidateQueries({ queryKey: ["thread"] });
            }
        }
    });

    return {
        mutateAsyncLike,
    };
};
