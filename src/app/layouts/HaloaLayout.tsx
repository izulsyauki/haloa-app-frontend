/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { myRoutes } from "../routes";
import { useAuthStore } from "../store/auth";
import { useLoadingStore } from "../store/loading";
import { SideBarLeft } from "./SideBarLeft";
import { SideBarRight } from "./SideBarRight";

export function HaloaLayout() {
    const { token, user } = useAuthStore();
    const { isLoading, setIsLoading } = useLoadingStore();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (!token || !user) {
                    navigate("/sign-in");
                }

                await new Promise((resolve) => setTimeout(resolve, 1000));
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [navigate, setIsLoading, token, user]);

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
