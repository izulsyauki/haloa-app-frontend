import { useQuery } from "@tanstack/react-query";
import { getThreads } from "../api/thread";

export const useThreadsFeeds = () => {
    const {data: threads} = useQuery({
        queryKey: ["threads"],
        queryFn: getThreads,
    });

    // const [threads, setThreads] = useState<Thread[]>([]);

    // // fetch threads
    // const fetchThreads = useCallback(async () => {
    //     try {
    //         setIsLoading(true);
    //         const response = await getThreads();
    //         setThreads(response);
    //     } catch (error) {
    //         console.error("Error fetching threads:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }, [setIsLoading]);

    // // hook fetch threads
    // useEffect(() => {
    //     fetchThreads();
    // }, [fetchThreads]);

    return { threads };
};