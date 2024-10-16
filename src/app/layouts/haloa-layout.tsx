/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex, Box, Text, useColorModeValue, Button } from "@chakra-ui/react";
import { useAuthStore } from "../store/auth";
import { Outlet } from "react-router-dom";
import { HiHome } from "react-icons/hi";

export function HaloaLayout() {
  const bgColor = useColorModeValue("light", "darkMode.bg")
  const { user } = useAuthStore();

  return (
    <Flex>
      <Box
        w={"23vw"}
        h={"100vh"}
        p={"1rem"}
        bg={bgColor}
      >
        <Text>Ini adalah bagian kiri</Text>
        <Button w={"100%"}><HiHome />   Ini adalah Menu</Button>
      </Box>

      <Box
        w={"54vw"}
        h={"100vh"}
        borderLeft={"1px solid #3F3F3F"}
        borderRight={"1px solid #3F3F3F"}
        p={"1rem"}
        bg={bgColor}
      >
        <Outlet />
      </Box>

      <Box w={"23vw"} h={"100vh"} p={"1rem"} bg={bgColor}>
        <Text>Ini adalah bagian kanan</Text>
      </Box>
    </Flex>
  );
}
