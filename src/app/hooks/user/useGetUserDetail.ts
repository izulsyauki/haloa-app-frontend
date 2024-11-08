import { useQuery } from "@tanstack/react-query";
import { getDetailUser } from "../../api/user";

export const useGetUserDetail = (id: number) => {
    const userDetail = useQuery({
        queryKey: ["userDetail", id],
        queryFn: () => getDetailUser(id),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60,
    });

    return userDetail;
}