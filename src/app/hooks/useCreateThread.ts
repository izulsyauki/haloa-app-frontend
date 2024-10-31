import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createThread } from "../api/thread";
import { CreateThreadRequest } from "../types/thread";
import { PostThreadSchema, postThreadSchema } from "../utils/postThreadSchema";

export const useCreateThread = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

    const form = useForm<PostThreadSchema>({
        resolver: zodResolver(postThreadSchema),
    });

    const handleOpenFileExplorer = () => {
        fileInputRef.current?.click();
    };

    const createThreadMutation = useMutation({
        mutationFn: async (data: CreateThreadRequest) => {
            return await createThread(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["threads"] });
        },
    });

    const onSubmit = form.handleSubmit(async (data) => {
        try {
            await createThreadMutation.mutateAsync({
                content: data.content,
                media: selectedFiles,
            });

            form.reset();
            setSelectedFiles([]);
            setPreviewUrls([]);
            onClose();
        } catch (error) {
            console.error("Error posting thread:", error);
        }
    });

    return {
        isOpen,
        onOpen,
        onClose,
        form,
        previewUrls,
        setPreviewUrls,
        selectedFiles,
        setSelectedFiles,
        fileInputRef,
        handleOpenFileExplorer,
        onSubmit,
        createThreadMutation,
    };
};

