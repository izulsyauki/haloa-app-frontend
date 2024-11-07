import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useForm } from "react-hook-form";
import API from "../../libs/axios";
import { useFollowStore } from "../../store/follow";
import { User } from "../../types/user";

const fetchUsers = async (search: string): Promise<User[]> => {
    if (!search) return [];
    const response = await API.get<User[]>(`/user/search?contains=${search}`);
    return response.data;
};

export const useSearchUser = () => {
    const { register, watch } = useForm({
        defaultValues: {
            search: "",
        },
    });
    const followingIds = useFollowStore((state) => state.followingIds);

    const searchTerm = watch("search");
    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users", debouncedSearch],
        queryFn: () => fetchUsers(debouncedSearch),
        enabled: Boolean(debouncedSearch),
        select: (data) => data.filter((user) => ({
            ...user,
            isFollowed: followingIds.includes(user.id)
        }))
    });

    return {
        register,
        watch,
        users,
        isLoading,
    };
};
