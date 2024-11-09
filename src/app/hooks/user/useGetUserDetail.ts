import { useQuery } from "@tanstack/react-query";
import { getDetailUser } from "../../api/user";

export const useGetUserDetail = (userId: number) => {
    console.log("Getting user detail for userId:", userId);

    return useQuery({
        queryKey: ["userDetail", userId],
        queryFn: () => getDetailUser(userId),
        enabled: !!userId,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        throwOnError: true,
        select: (data) => {
            console.log("User detail data:", data);
            return data;
        }
    });
};