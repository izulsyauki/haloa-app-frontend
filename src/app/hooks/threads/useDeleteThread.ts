import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteThread } from "../../api/thread";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

export const useDeleteThread = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const [openDeleteId, setOpenDeleteId] = useState<number | null>(null);

    const deleteThreadMutation = useMutation({
        mutationFn: async (threadId: number) => {
            const response = await deleteThread(threadId);
            console.log("Delete response:", response);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["threads"] });
            queryClient.invalidateQueries({ queryKey: ["user-threads"] });
            toast({
                title: "Thread deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: (error: Error) => {
            console.error("Delete error:", error);
            toast({
                title: "Error deleting thread",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    const handleToggleDelete = (e: React.MouseEvent, threadId: number) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenDeleteId(openDeleteId === threadId ? null : threadId);
    };

    const handleDelete = async (threadId: number) => {
        try {
            await deleteThreadMutation.mutateAsync(threadId);
            setOpenDeleteId(null);
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return { handleToggleDelete, handleDelete, openDeleteId, deleteThreadMutation };
};
