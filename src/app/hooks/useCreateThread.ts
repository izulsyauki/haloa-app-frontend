import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../api/thread";
import { CreateThreadRequest } from "../types/thread";

const useCreateThread = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateThreadRequest) => {
            return await createThread(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["threads"] });
        },
    });
};

export default useCreateThread;
