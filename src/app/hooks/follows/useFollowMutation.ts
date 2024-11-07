import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser, unfollowUser } from "../../api/follow";
import { useFollowStore } from "../../store/follow";
import { UserProfile } from "../../types/user";

interface UserProfileWithCount extends UserProfile {
  _count: {
    following: number;
    follower: number;
  };
}

export const useFollowMutation = () => {  
  const queryClient = useQueryClient();
  const { addFollowing, removeFollowingId } = useFollowStore();

  const followMutation = useMutation({
    mutationFn: followUser,
    onSuccess: (_, followingId) => {
      // Update following store
      addFollowing(followingId);
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      
      // Update count secara optimistic
      queryClient.setQueryData<UserProfileWithCount>(["userProfile"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          _count: {
            ...oldData._count,
            following: (oldData._count?.following || 0) + 1,
            follower: oldData._count?.follower || 0
          }
        };
      });
    }
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: (_, followingId) => {
      // Update following store
      removeFollowingId(followingId);
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      
      // Update count secara optimistic
      queryClient.setQueryData<UserProfileWithCount>(["userProfile"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          _count: {
            ...oldData._count,
            following: Math.max((oldData._count?.following || 0) - 1, 0),
            follower: oldData._count?.follower || 0
          }
        };
      });
    }
  });

  return {
    followMutation,
    unfollowMutation
  };
}; 