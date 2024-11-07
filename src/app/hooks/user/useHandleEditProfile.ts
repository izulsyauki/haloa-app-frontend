import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileData } from "../../api/profile";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileFormInputs, updateProfileSchema } from "../../utils/updateProfileSchema";
import { useGetLoginUserProfile } from "../auth/useGetLoginUserProfile";

export const useHandleEditProfile = () => {
    const { userProfile } = useGetLoginUserProfile();
    const toast = useToast();
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const queryClient = useQueryClient();
    
    // State untuk file dan preview
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<UpdateProfileFormInputs>({
        resolver: zodResolver(updateProfileSchema),
        values: {
            fullName: userProfile?.profile?.fullName || "",
            username: userProfile?.username || "",
            bio: userProfile?.profile?.bio || "",
        }
    });

    const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useMutation({
        mutationFn: async (data: UpdateProfileFormInputs) => {
            const formData = new FormData();
            
            // Append text fields
            formData.append("fullName", data.fullName);
            formData.append("username", data.username);
            if (data.bio) formData.append("bio", data.bio);
            
            // Append files if they exist
            if (data.avatar?.[0]) formData.append("avatar", data.avatar[0]);
            if (data.banner?.[0]) formData.append("banner", data.banner[0]);

            return await updateProfileData(formData);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["threads"] });
            await queryClient.invalidateQueries({ queryKey: ["userThreads"] });
            await queryClient.refetchQueries({ queryKey: ["userProfile"], exact: true });

            handleEditProfileClose();
            
            toast({
                title: "Profile updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Error updating profile",
                description: error.message || "An error occurred, please try again",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    });

    const handleEditProfileOpen = () => {
        reset({
            fullName: userProfile?.profile?.fullName || "",
            username: userProfile?.username || "",
            bio: userProfile?.profile?.bio || "",
        });
        setAvatarPreview(userProfile?.profile?.avatar || null);
        setBannerPreview(userProfile?.profile?.banner || null);
        setIsEditProfileOpen(true);
    };

    const handleEditProfileClose = () => {
        setIsEditProfileOpen(false);
        reset();
        setAvatarPreview(null);
        setBannerPreview(null);
    };

    const handleFileChange = (type: "avatar" | "banner", file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (type === "avatar") {
                setValue("avatar", [file]);
                setAvatarPreview(reader.result as string);
            } else {
                setValue("banner", [file]);
                setBannerPreview(reader.result as string);
            }
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = handleSubmit((data) => {
        updateProfile(data);
    });

    return {
        isEditProfileOpen,
        avatarPreview,
        bannerPreview,
        isUpdatingProfile,
        errors,
        register,
        handleEditProfileOpen,
        handleEditProfileClose,
        handleFileChange,
        onSubmit
    };
};
