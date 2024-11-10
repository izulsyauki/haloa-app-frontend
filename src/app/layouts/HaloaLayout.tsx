/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { myRoutes } from "../routes";
import { useAuthStore } from "../store/auth";
import { useLoadingStore } from "../store/loading";
import { SideBarLeft } from "./SideBarLeft";
import { SideBarRight } from "./SideBarRight";

interface AxiosError {
    response?: {
        status?: number;
    };
}

export function HaloaLayout() {
    const { token, user } = useAuthStore();
    const { isLoading, setIsLoading } = useLoadingStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState<{ status?: number } | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (!token || !user) {
                    if (location.pathname !== "/reset-password") {
                        navigate("/sign-in");
                    }
                }

                axios.interceptors.response.use(
                    (response) => response,
                    (error) => {
                        if (error.response?.status === 500) {
                            setError({ status: 500 });
                        }
                        return Promise.reject(error);
                    }
                );

                await new Promise((resolve) => setTimeout(resolve, 1000));
            } catch (error) {
                console.log(error);
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 500) {
                    setError({ status: 500 });
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [navigate, setIsLoading, token, user, location.pathname]);

    if (error?.status === 500) {
        navigate("/error");
    }

    return (
        <>
            {isLoading ? (
                        <myRoutes.PreLoadPageRoute />
            ) : (
                    <Flex>
                        <SideBarLeft />

                        <Box
                            ml={"21vw"}
                            w={"51vw"}
                            minHeight={"100dvh"}
                            borderLeft={"1px solid #3F3F3F"}
                            borderRight={"1px solid #3F3F3F"}
                            p={"1rem 0px"}
                        >
                            <Outlet />
                        </Box>

                        <SideBarRight />
                    </Flex>
            )}
        </>
    );
}
