import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteThread } from "../api/thread";
import { useToast } from "@chakra-ui/react";

export const useDeleteThread = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: async (threadId: number) => {
            console.log("Deleting thread ID:", threadId);
            return await deleteThread(threadId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["threads"] });
            toast({
                title: "Thread deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Error deleting thread",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    });
}
