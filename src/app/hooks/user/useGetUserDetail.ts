import { useQuery } from "@tanstack/react-query";
import { getDetailUser } from "../../api/user";

export const useGetUserDetail = (userId: number) => {
    return useQuery({
        queryKey: ["userDetail", userId],
        queryFn: () => getDetailUser(userId),
        enabled: !!userId,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        throwOnError: true,
    });
};