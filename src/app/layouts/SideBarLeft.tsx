import { Box, Image, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../public/assets/logo/logo.svg";
import myIcons from "../assets/icons/myIcons";
import { CustomBtnPrimary, CustomBtnSideBar } from "../components/CustomBtn";
// import { useAuthStore } from "../store/auth";

interface LeftBarMenu {
    solidIcon: ReactNode;
    outlineIcon: ReactNode;
    path: string;
    name: string;
}

const leftBarMenu: LeftBarMenu[] = [
    {
        solidIcon: <myIcons.HiHome fontSize={"22px"} />,
        outlineIcon: <myIcons.HiOutlineHome fontSize={"22px"} />,
        path: "/",
        name: "Home",
    },
    {
        solidIcon: <myIcons.HiSearchCircle fontSize={"22px"} />,
        outlineIcon: <myIcons.HiOutlineSearchCircle fontSize={"22px"} />,
        path: "/search",
        name: "Search",
    },
    {
        solidIcon: <myIcons.HiHeart fontSize={"22px"} />,
        outlineIcon: <myIcons.HiOutlineHeart fontSize={"22px"} />,
        path: "/follows",
        name: "Follows",
    },
    {
        solidIcon: <myIcons.HiUserCircle fontSize={"22px"} />,
        outlineIcon: <myIcons.HiOutlineUserCircle fontSize={"22px"} />,
        path: "/profile",
        name: "Profile",
    },
];

export function SideBarLeft() {
    const location = useLocation();
    const navigate = useNavigate();
    // const { clearUser } = useAuthStore();

    return (
        <Box
            w={"21vw"}
            h={"100vh"}
            p={"1rem"}
            position={"fixed"}
            zIndex={999}
            overflowY={"auto"}
            display={"flex"}
            flexDir={"column"}
            gap={"15px"}
        >
            <Image src={Logo} h={"32px"} alignSelf={"start"} p={"0px 18px"} />
            <VStack gap={0}>
                {leftBarMenu.map((menu, index) => (
                    <CustomBtnSideBar
                        key={index}
                        solidIcon={menu.solidIcon}
                        outlineIcon={menu.outlineIcon}
                        label={menu.name}
                        isActive={location.pathname === menu.path}
                        onClick={() => {
                            navigate(menu.path);
                        }}
                    />
                ))}

                <CustomBtnPrimary label="Create Post" />
            </VStack>
            <CustomBtnSideBar
                onClick={() => {
                    navigate("/sign-in");
                    // clearUser();
                }}
                mt={"auto"}
                outlineIcon={
                    <Box transform="scaleX(-1)">
                        <myIcons.HiOutlineLogout fontSize={"22px"} />
                    </Box>
                }
                label="Logout"
            />
        </Box>
    );
}
