import { useForm } from "react-hook-form";
import { User } from "../../types/user";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import API from "../../libs/axios";

export const useSearchUser = () => {
    const { register, watch } = useForm({
        defaultValues: {
            search: "",
        },
    });

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearch = useDebounce(watch("search"), 500);

    useEffect(() => {
        const fetchUsers = async () => {
            if (debouncedSearch) {
                setIsLoading(true);
                try {
                    const response = await API.get<User[]>(`/user/search?contains=${debouncedSearch}`);
                    setUsers(response.data);
                } catch (error) {
                    console.error("Error fetching users:", error);
                    setUsers([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setUsers([]);
            }
        };

        fetchUsers();
    }, [debouncedSearch]);

    return {
        register,
        watch,
        users,
        isLoading,
    };
};
