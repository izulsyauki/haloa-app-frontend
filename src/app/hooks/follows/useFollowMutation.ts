import { useMutation } from "@tanstack/react-query";
import { followUser, unfollowUser } from "../../api/follow";
import { useFollowStore } from "../../store/follow";

export const useFollowMutation = () => {
  const { addFollowing, removeFollowingId } = useFollowStore();

  const followMutation = useMutation({
    mutationFn: (userId: number) => followUser(userId),
    onSuccess: (_, userId) => {
      // Update following store
      addFollowing(userId);
    }
  });

  const unfollowMutation = useMutation({
    mutationFn: (userId: number) => unfollowUser(userId),
    onSuccess: (_, userId) => {
      // Update following store
      removeFollowingId(userId);
    }
  });

  return {
    followMutation,
    unfollowMutation
  };
}; 