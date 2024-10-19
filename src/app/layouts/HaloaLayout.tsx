/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Flex
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { SideBarLeft } from "./SideBarLeft";
import { SideBarRight } from "./SideBarRight";


export function HaloaLayout() {

  return (
    <Flex>
      <SideBarLeft />

      <Box
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
  );
}
