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
    // onMutate: async () => {
    //   // cancel refetch yang berjalan
    //   await queryClient.cancelQueries({ queryKey: ["userProfile"] });

    //   // ambil data sebelum mutasi
    //   const previousProfile = queryClient.getQueryData<UserProfileWithCount>(["userProfile"]);

    //   queryClient.setQueryData(["userProfile"], (old: UserProfileWithCount) => {
    //     if (!old) return old;
    //     return {
    //       ...old,
    //       _count: {
    //         ...old._count,
    //         following: (old._count?.following || 0) + 1
    //       }
    //     }
    //   });

    //   return { previousProfile };
    // },
    onSuccess: (_, followingId) => {
      // Update following store
      addFollowing(followingId);
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] });
      
      // Update count secara optimistic
      queryClient.setQueryData<UserProfileWithCount>(["userProfile"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          _count: {
            ...oldData._count,
            following: (oldData._count?.following || 0),
            follower: (oldData._count?.follower || 0 ) + 1
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
      queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] });
      
      // Update count secara optimistic
      queryClient.setQueryData<UserProfileWithCount>(["userProfile"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          _count: {
            ...oldData._count,
            following: (oldData._count?.following || 0),
            follower: Math.max((oldData._count?.follower || 0) - 1, 0)
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