import { useCallback, useRef, useState } from "react";
import { useAuthStore } from "../store/auth";

export const useHandleEditProfile = () => {
    const { user: loggedInUser } = useAuthStore();
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    const fullNameRef = useRef(loggedInUser?.profile?.fullName || "");
    const usernameRef = useRef(loggedInUser?.username || "");
    const bioRef = useRef(loggedInUser?.profile?.bio || "");

    const handleEditProfileOpen = useCallback(() => {
        fullNameRef.current = loggedInUser?.profile?.fullName || "";
        usernameRef.current = loggedInUser?.username || "";
        bioRef.current = loggedInUser?.profile?.bio || "";
        setIsEditProfileOpen(true);
    }, [loggedInUser]);

    const handleEditProfileClose = () => {
        setIsEditProfileOpen(false);
    };

    const handleSaveProfile = () => {
        console.log("Saving profile");

        handleEditProfileClose();
    };

    const handleInputChange = (
        field: "fullName" | "username" | "bio",
        value: string
    ) => {
        switch (field) {
            case "fullName":
                fullNameRef.current = value;
                break;
            case "username":
                usernameRef.current = value;
                break;
            case "bio":
                bioRef.current = value;
                break;
        }
    };

    return {
        isEditProfileOpen,
        fullName: fullNameRef.current,
        username: usernameRef.current,
        bio: bioRef.current,
        handleEditProfileOpen,
        handleEditProfileClose,
        handleInputChange,
        handleSaveProfile
    };
};
