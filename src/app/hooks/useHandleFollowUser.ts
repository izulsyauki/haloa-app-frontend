/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { User } from "../types/user";
import { followUser, unfollowUser } from "../api/follow";
import { useFollowStore } from "../store/follow";

export const useHandleFollowUser = () => {
  const { addFollowing, removeFollowingId } = useFollowStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFollowClick = async (
    user: User, 
    suggestedUser: User[], 
    setSuggestedUser: (users: User[]) => void,
    fetchNewSuggested?: () => Promise<void>
  ) => {
    if (user.isFollowed) {
        setSelectedUser(user);
        onOpen();
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
        await followUser(user.id);
        addFollowing(user.id);

        // Update local state dengan isFollowed
        const updatedUsers = suggestedUser.map(u => 
            u.id === user.id 
                ? { ...u, isFollowed: true } 
                : u
        ).filter(u => !u.isFollowed); // Filter yang belum di-follow

        setSuggestedUser(updatedUsers);

        // Fetch data suggested users yang baru
        if (fetchNewSuggested) {
            await fetchNewSuggested();
        }

    } catch (error) {
        console.error("Error following user:", error);
        setError("Gagal follow user");
    } finally {
        setIsLoading(false);
    }
  };

  const handleUnfollow = async (
    suggestedUser: User[], 
    setSuggestedUser: (users: User[]) => void,
    fetchNewSuggested?: () => Promise<void>
  ) => {
    if (!selectedUser) return;

    setIsLoading(true);
    setError(null);

    try {
        await unfollowUser(selectedUser.id);
        removeFollowingId(selectedUser.id);
        
        onClose();
        
        // Tambahkan kembali user ke suggested users
        if (fetchNewSuggested) {
            await fetchNewSuggested();
        }
        
    } catch (error) {
        setError("Failed to unfollow user");
    } finally {
        setIsLoading(false);
        setSelectedUser(null);
    }
  };

  return {
    isOpen,
    onClose,
    selectedUser,
    handleFollowClick,
    handleUnfollow,
    isLoading,
    error
  };
};
