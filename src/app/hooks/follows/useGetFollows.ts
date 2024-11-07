import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getFollowers, getFollowing } from "../../api/follow";
import { useFollowStore } from "../../store/follow";
import { Follow } from "../../types/user";

export const useGetFollows = () => {
    const setFollowingIds = useFollowStore((state) => state.setFollowingIds);

    const followersQuery = useQuery({
        queryKey: ["followers"],
        queryFn: getFollowers,
        staleTime: 1000 * 60,
    });

    const followingQuery = useQuery<Follow[]>({
        queryKey: ["following"],
        queryFn: () => getFollowing() as Promise<Follow[]>,
        staleTime: 1000 * 60,
    });

    useEffect(() => {
        if (followingQuery.isSuccess && followingQuery.data) {
            const followingIds = followingQuery.data.map(follow => follow.following?.id || 0).filter(id => id !== 0);
            setFollowingIds(followingIds);
        }
    }, [followingQuery.isSuccess, followingQuery.data, setFollowingIds]);


    return {
        followers: followersQuery.data || [],
        following: followingQuery.data || [],
        isLoading: followersQuery.isLoading || followingQuery.isLoading,
    }
}