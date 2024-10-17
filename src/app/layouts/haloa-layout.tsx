/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Logo from "../../../public/assets/logo/logo.svg";
import myIcons from "../assets/icons/myIcons";
import { useAuthStore } from "../store/auth";
import { CustomBtnSideBar } from "../components/CustomBtnSideBar";
import { CustomBtnPrimary } from "../components/CustomBtnPrimary";

export function HaloaLayout() {
  const { user } = useAuthStore();

  return (
    <Flex>
      <Box
        w={"23vw"}
        h={"100vh"}
        p={"1rem"}
        display={"flex"}
        flexDir={"column"}
        gap={"15px"}
      >
        <Image src={Logo} h={"32px"} alignSelf={"start"} p={"0px 18px"} />
        <VStack gap={0}>
          <CustomBtnSideBar
            icon={<myIcons.HiOutlineHome fontSize={"22px"} />}
            label="Home"
          />
          <CustomBtnSideBar
            icon={<myIcons.HiOutlineSearchCircle fontSize={"22px"} />}
            label="Search"
          />
          <CustomBtnSideBar
            icon={<myIcons.HiOutlineHeart fontSize={"22px"} />}
            label="Follows"
          />
          <CustomBtnSideBar
            icon={<myIcons.HiOutlineUserCircle fontSize={"22px"} />}
            label="Profile"
          />
          <CustomBtnPrimary label="Create Post" />
        </VStack>
        <CustomBtnSideBar
          mt={"auto"}
          icon={
            <Box transform="scaleX(-1)">
              <myIcons.HiOutlineLogout fontSize={"22px"} />
            </Box>
          }
          label="Logout"
        />
      </Box>

      <Box
        w={"54vw"}
        h={"100vh"}
        borderLeft={"1px solid #3F3F3F"}
        borderRight={"1px solid #3F3F3F"}
        p={"1rem"}
      >
        <Outlet />
      </Box>

      <Box w={"23vw"} h={"100vh"} p={"1rem"}>
        <Text>Ini adalah bagian kanan</Text>
      </Box>
    </Flex>
  );
}
