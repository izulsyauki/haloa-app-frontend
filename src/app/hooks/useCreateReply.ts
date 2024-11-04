import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReply } from "../api/thread";
import { ThreadDetail } from "../types/thread";

interface CreateReplyParams {
    formData: FormData;
    threadId: number;
}

export const useCreateReply = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: CreateReplyParams) => createReply(params),
        onSuccess: async (response, variables) => {
            // Update cache untuk semua thread yang mungkin terkait
            const queries = queryClient.getQueriesData<ThreadDetail>({ queryKey: ["thread"] });
            
            for (const [queryKey, data] of queries) {
                if (!data) continue;

                queryClient.setQueryData<ThreadDetail>(queryKey, (oldData) => {
                    if (!oldData) return oldData;

                    // Jika ini thread utama yang direply
                    if (oldData.id === variables.threadId) {
                        return {
                            ...oldData,
                            _count: {
                                ...oldData._count,
                                replies: (oldData._count.replies || 0) + 1
                            }
                        };
                    }

                    // Update replies yang ada di dalam thread
                    return {
                        ...oldData,
                        replies: oldData.replies?.map((reply) => {
                            if (reply.id === variables.threadId) {
                                return {
                                    ...reply,
                                    _count: {
                                        ...reply._count,
                                        replies: (reply._count.replies || 0) + 1
                                    }
                                };
                            }
                            return reply;
                        })
                    };
                });
            }

            // Invalidate dan refetch untuk memastikan data sinkron
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["thread"] }),
                queryClient.invalidateQueries({ queryKey: ["threads"] })
            ]);

            if (onSuccess) {
                onSuccess();
            }
        },
        onError: (error) => {
            console.error('Error in createReply:', error);
        }
    });
};
