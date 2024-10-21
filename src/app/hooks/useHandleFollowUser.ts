/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { User } from "../types/user";

export const useHandleFollowUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleFollowClick = (user: User, suggestedUser: User[], setSuggestedUser: (users: User[]) => void ) => {
    if (!user.isFollowed) {
      console.log("Following: ", user.username)
      const followedUser = suggestedUser.map((u) =>
        u.username === user.username ? { ...u, isFollowed: true } : u
      );
      setSuggestedUser(followedUser);
    } else {
      setSelectedUser(user);
      onOpen();
    }
  };

  const handleUnfollow = (suggestedUser: User[], setSuggestedUser: (users: User[]) => void) => {
    if (selectedUser) {
      const unfollowedUser = suggestedUser.map((u) =>
        u.username === selectedUser.username ? { ...u, isFollowed: false } : u
      );
      setSuggestedUser(unfollowedUser);
      onClose();
    }
  };

  return {
    isOpen,
    onClose,
    selectedUser,
    handleFollowClick,
    handleUnfollow,
  };
};
