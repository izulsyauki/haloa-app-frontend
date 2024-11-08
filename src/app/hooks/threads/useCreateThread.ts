import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createThread } from "../../api/thread";
import { CreateThreadRequest } from "../../types/thread";
import { PostThreadSchema, postThreadSchema } from "../../utils/postThreadSchema";
import { useDisclosure } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export const useCreateThread = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const toast = useToast();

    const form = useForm<PostThreadSchema>({
        resolver: zodResolver(postThreadSchema),
    });

    const handleOpenFileExplorer = () => {
        fileInputRef.current?.click();
    };

    const createThreadMutation = useMutation({
        mutationFn: async (data: CreateThreadRequest) => {
            // Pindahkan invalidateQueries ke sini saja
            const response = await createThread(data);
            return response;
        },
        onSuccess: () => {
            // invalidate query setelah berhasil membuat thread
            queryClient.invalidateQueries({ queryKey: ["threads"] });
            queryClient.invalidateQueries({ queryKey: ["userThreads"] });
            queryClient.invalidateQueries({ queryKey: ["thread"] });

            toast({
                title: "Thread created",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        },
        onError: () => {
            toast({
                title: "Failed to create thread",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
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

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            if (selectedFiles.length + newFiles.length > 4) {
                alert("You can only upload up to 4 files");
                return;
            }

            setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

            newFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrls((prevImages) => [
                        ...prevImages,
                        reader.result as string,
                    ]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

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
        handleFileSelect
    };
};
