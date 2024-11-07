/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { User } from "../../types/user";
import { useFollowMutation } from "./useFollowMutation";
import { useFollowStore } from "../../store/follow";

export const useHandleFollowUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { followMutation, unfollowMutation } = useFollowMutation();
  const { followingIds, addFollowing, removeFollowingId } = useFollowStore();

  const handleFollowClick = async (user: User) => {
    const isCurrentlyFollowing = followingIds.includes(user.id);

    if (isCurrentlyFollowing) {
      setSelectedUser(user);
      onOpen();
      return;
    }

    try {
      await followMutation.mutateAsync(user.id);
      addFollowing(user.id);
      user.isFollowed = true;
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async () => {
    if (!selectedUser) return;

    try {
      await unfollowMutation.mutateAsync(selectedUser.id);
      removeFollowingId(selectedUser.id);
      selectedUser.isFollowed = false;
      onClose();
    } catch (error) {
      console.error("Error unfollowing user:", error);
    } finally {
      setSelectedUser(null);
    }
  };

  return {
    isOpen,
    onClose,
    selectedUser,
    handleFollowClick,
    handleUnfollow,
    isLoading: followMutation.isPending || unfollowMutation.isPending,
    error: followMutation.error || unfollowMutation.error
  };
};
