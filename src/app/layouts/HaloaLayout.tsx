/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { myRoutes } from "../routes";
import { useAuthStore } from "../store/auth";
import { useLoadingStore } from "../store/loading";
import { SideBarLeft } from "./SideBarLeft";
import { SideBarRight } from "./SideBarRight";

export function HaloaLayout() {
    const { token, user } = useAuthStore();
    const { isLoading, setIsLoading } = useLoadingStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [error] = useState<{ status?: number } | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (!token || !user) {
                    if (location.pathname !== "/reset-password") {
                        navigate("/sign-in");
                    }
                }

                await new Promise((resolve) => setTimeout(resolve, 1000));
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [navigate, setIsLoading, token, user, location.pathname]);

    if (error?.status === 500) {
        return <myRoutes.ErrorPageRoute />
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
