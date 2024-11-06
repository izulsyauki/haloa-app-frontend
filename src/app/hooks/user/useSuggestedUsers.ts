import { useQuery } from "@tanstack/react-query";
import { getSuggestedUsers } from "../../api/user";
import { useFollowStore } from "../../store/follow";

export const useSuggestedUsers = (limit: number = 3) => {
  const followingIds = useFollowStore((state) => state.followingIds);

  return useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      const users = await getSuggestedUsers(limit);
      return users.map(user => ({
        ...user,
        isFollowed: followingIds.includes(user.id)
      }));
    }
  });
}; 