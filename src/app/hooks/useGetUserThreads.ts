import { useQuery } from "@tanstack/react-query";
import { getUserThreads } from "../api/thread";

export const useGetUserThreads = () => {
    const userThreads = useQuery({
            queryKey: ["user-threads"],
            queryFn: async () => {
                try {
                    return await getUserThreads();
                } catch (error) {
                    console.error("Error fetching threads:", error);
                }
            },
        }); 
    
        return userThreads;
    };