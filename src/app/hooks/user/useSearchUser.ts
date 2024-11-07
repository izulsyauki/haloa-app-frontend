import { useForm } from "react-hook-form";
import { User } from "../../types/user";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import API from "../../libs/axios";

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

    const searchTerm = watch("search");
    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users", debouncedSearch],
        queryFn: () => fetchUsers(debouncedSearch),
        enabled: Boolean(debouncedSearch),
    });

    return {
        register,
        watch,
        users,
        isLoading,
    };
};
