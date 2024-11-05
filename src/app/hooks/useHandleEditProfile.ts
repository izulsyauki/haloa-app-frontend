import { useCallback, useRef, useState } from "react";
import { useAuthStore } from "../store/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileData } from "../api/profile";
import { useToast } from "@chakra-ui/react";

export const useHandleEditProfile = () => {
    const { user: loggedInUser } = useAuthStore();
    const toast = useToast();
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const queryClient = useQueryClient();

    // // Gunakan useRef untuk form fields
    // const fullNameRef = useRef(loggedInUser?.profile?.fullName || "");
    // const usernameRef = useRef(loggedInUser?.username || "");
    // const bioRef = useRef(loggedInUser?.profile?.bio || "");

    // useRef untuk initial value
    const initialValues = useRef({
        fullName: loggedInUser?.profile?.fullName || "",
        username: loggedInUser?.username || "",
        bio: loggedInUser?.profile?.bio || ""
    });

    // useRef untuk current value
    const currentValues = useRef({
        fullName: loggedInUser?.profile?.fullName || "",
        username: loggedInUser?.username || "",
        bio: loggedInUser?.profile?.bio || ""
    });
    
    // State untuk file dan preview
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const handleEditProfileOpen = useCallback(() => {
        // Set nilai awal saat modal dibuka
        initialValues.current = {
            fullName: loggedInUser?.profile?.fullName || "",
            username: loggedInUser?.username || "",
            bio: loggedInUser?.profile?.bio || ""
        };
        currentValues.current = { ...initialValues.current };
        setAvatarPreview(loggedInUser?.profile?.avatar || null);
        setBannerPreview(loggedInUser?.profile?.banner || null);
        setIsEditProfileOpen(true);
    }, [loggedInUser]);

    const handleEditProfileClose = () => {
        setIsEditProfileOpen(false);
        setAvatarFile(null);
        setBannerFile(null);
        setAvatarPreview(null);
        setBannerPreview(null);
    };

    const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useMutation({
        mutationFn: async () => {
            const formData = new FormData();

            // Hanya append field yang berubah
            if (currentValues.current.fullName !== initialValues.current.fullName) {
                formData.append("fullName", currentValues.current.fullName);
            }
            if (currentValues.current.username !== initialValues.current.username) {
                formData.append("username", currentValues.current.username);
            }
            if (currentValues.current.bio !== initialValues.current.bio) {
                formData.append("bio", currentValues.current.bio);
            }

            // Append file data jika ada
            if (avatarFile) {
                formData.append("avatar", avatarFile);
            }
            if (bannerFile) {
                formData.append("banner", bannerFile);
            }

            return await updateProfileData(formData);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["threads"] });
            await queryClient.invalidateQueries({ queryKey: ["userThreads"] });
            
            await new Promise(resolve => setTimeout(resolve, 300));
            
            await queryClient.refetchQueries({ 
                queryKey: ["userProfile"], 
                exact: true 
            });

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
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    });

    const handleFileChange = (type: "avatar" | "banner", file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (type === "avatar") {
                setAvatarFile(file);
                setAvatarPreview(reader.result as string);
            } else {
                setBannerFile(file);
                setBannerPreview(reader.result as string);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (
        field: "fullName" | "username" | "bio",
        value: string
    ) => {
        currentValues.current[field] = value;
    };

    return {
        isEditProfileOpen,
        fullName: currentValues.current.fullName,
        username: currentValues.current.username,
        bio: currentValues.current.bio,
        avatarPreview,
        bannerPreview,
        isUpdatingProfile,
        handleEditProfileOpen,
        handleEditProfileClose,
        handleInputChange,
        handleFileChange,
        handleSaveProfile: updateProfile
    };
};
