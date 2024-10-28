/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { User } from "../types/user";
import { followUser } from "../api/follow";

export const useHandleFollowUser = () => {
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

    // Optimistic UI update
    const updatedUsers = suggestedUser.map(u => 
        u.id === user.id ? { ...u, isFollowed: true } : u
    );
    setSuggestedUser(updatedUsers);

    try {
        await followUser(user.id);

        // Fetch data suggested users yang baru
        if (fetchNewSuggested) {
            await fetchNewSuggested();
        }

    } catch (error) {
        console.error("Error following user:", error);
        setError("Gagal follow user");

        // Revert UI update if there's an error
        const revertedUsers = suggestedUser.map(u => 
            u.id === user.id ? { ...u, isFollowed: false } : u
        );
        setSuggestedUser(revertedUsers);
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
      await followUser(selectedUser.id);
      onClose();
      
      // Fetch data suggested users yang baru setelah unfollow
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
