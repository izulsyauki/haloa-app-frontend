import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike } from "../../api/like";
import { Thread, ThreadDetail } from "../../types/thread";

export const useHandleLike = () => {
    const queryClient = useQueryClient();

    const mutateAsyncLike = useMutation({
        mutationFn: (threadId: number) => createLike(threadId),
        onMutate: async (threadId: number) => {
            console.log("Starting mutation for threadId:", threadId);

            // Batalkan queries yang sedang berjalan
            await Promise.all([
                queryClient.cancelQueries({ queryKey: ["threads"] }),
                queryClient.cancelQueries({
                    queryKey: ["thread", threadId.toString()],
                }),
                queryClient.cancelQueries({ queryKey: ["userThreads"] }),
                queryClient.cancelQueries({ queryKey: ["otherUserThreads"] }),
            ]);

            // Simpan state sebelumnya
            const previousThreads = queryClient.getQueryData<Thread[]>([
                "threads",
            ]);
            const previousThread = queryClient.getQueryData<ThreadDetail>([
                "thread",
                threadId.toString(),
            ]);
            const previousUserThreads = queryClient.getQueryData<Thread[]>([
                "userThreads",
            ]);
            const previousOtherUserThreads = queryClient.getQueryData<Thread[]>([
                "otherUserThreads"
            ]);

            // Fungsi helper untuk update like status
            const updateLikeStatus = <T extends Thread | ThreadDetail>(
                item: T
            ): T => ({
                ...item,
                isLiked: !item.isLiked,
                _count: {
                    ...item._count,
                    like: item.isLiked
                        ? item._count.like - 1
                        : item._count.like + 1,
                    replies: item._count.replies,
                },
            });

            // Update semua cache dengan status yang sama
            const updatedStatus = previousThreads?.find(
                (t) => t.id === threadId
            )?.isLiked;

            if (previousThreads) {
                queryClient.setQueryData(
                    ["threads"],
                    previousThreads.map((thread) =>
                        thread.id === threadId
                            ? updateLikeStatus(thread)
                            : thread
                    )
                );
            }

            if (previousUserThreads) {
                queryClient.setQueryData(
                    ["userThreads"],
                    previousUserThreads.map((thread) =>
                        thread.id === threadId
                            ? {
                                  ...updateLikeStatus(thread),
                                  isLiked: !updatedStatus, // Pastikan status like konsisten
                              }
                            : thread
                    )
                );
            }

            if (previousThread?.id === threadId) {
                queryClient.setQueryData(
                    ["thread", threadId.toString()],
                    updateLikeStatus(previousThread)
                );
            }

            if (previousOtherUserThreads) {
                queryClient.setQueryData(
                    ["otherUserThreads"],
                    previousOtherUserThreads.map((thread) =>
                        thread.id === threadId
                            ? {
                                  ...updateLikeStatus(thread),
                                  isLiked: !updatedStatus, // Pastikan status like konsisten
                              }
                            : thread
                    )
                );
            }

            return {
                previousThreads,
                previousThread,
                previousUserThreads,
                previousOtherUserThreads
            };
        },

        onError: (_, threadId, context) => {
            if (context?.previousThreads) {
                queryClient.setQueryData(["threads"], context.previousThreads);
            }
            if (context?.previousThread) {
                queryClient.setQueryData(
                    ["thread", threadId.toString()],
                    context.previousThread
                );
            }
            if (context?.previousUserThreads) {
                queryClient.setQueryData(
                    ["userThreads"],
                    context.previousUserThreads
                );
            }
            if (context?.previousOtherUserThreads) {
                queryClient.setQueryData(
                    ["otherUserThreads"],
                    context.previousOtherUserThreads
                );
            }
        },

        onSettled: (_data, _error, threadId) => {
            // Refetch data setelah mutasi selesai (baik sukses maupun error)
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ["threads"] });
                queryClient.invalidateQueries({
                    queryKey: ["thread", threadId.toString()],
                });
                queryClient.invalidateQueries({ queryKey: ["userThreads"] });
                queryClient.invalidateQueries({ queryKey: ["otherUserThreads"] });
            }, 100);
        },
    });

    return { mutateAsyncLike };
};
