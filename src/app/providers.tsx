import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    {children}
                </ChakraProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </>
    );
}
