import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { getSuggestedUsers } from "../../api/user";
import { useFollowStore } from "../../store/follow";
import { useGetFollows } from "../follows/useGetFollows";

export const useSuggestedUsers = (limit = 3) => {
    const { following } = useGetFollows();
    const followingIds = useFollowStore((state) => state.followingIds);

    const suggestedUsersQuery = useQuery({
        queryKey: ["suggestedUsers", followingIds],
        queryFn: () => getSuggestedUsers(limit),
        enabled: following !== undefined,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

    const processedUser = useMemo(() => {
        if (!suggestedUsersQuery.data) return [];

        
        return suggestedUsersQuery.data.map((user) => ({
            ...user,
            isFollowed: followingIds.includes(user.id),
        }));
    }, [followingIds, suggestedUsersQuery]);

    const refetchData = useCallback(() => {
        suggestedUsersQuery.refetch();
    }, [suggestedUsersQuery]);

    return {
        suggestedUsers: processedUser,
        isLoading: suggestedUsersQuery.isLoading,
        refetchData,
    };
};
