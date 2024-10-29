import { useQuery } from "@tanstack/react-query";
import { getThreads } from "../api/thread";

export const useThreadsFeeds = (isLoading: boolean, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    const {data: threads} = useQuery({
        queryKey: ["threads"],
        queryFn: async () => {
            setIsLoading(true);
            try {
                return await getThreads();
            } catch (error) {
                console.error("Error fetching threads:", error);
            } finally {
                setIsLoading(false);
            }
        },
    });

    console.log("ini adalah threads", threads);
    return { threads };
};