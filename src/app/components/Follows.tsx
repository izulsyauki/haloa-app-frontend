import {
    Box,
    HStack,
    Text
} from "@chakra-ui/react";
import { CustomBtnSecondary } from "../components/CustomBtn";

export function Follows() {

  return (
    <Box w={"100%"}>
      <Box p={"0px 1rem"} mb={"10px"}>
          <Text fontSize={"18px"} fontWeight={"bold"}>
            Follows
          </Text>
      </Box>
      <HStack w={"100%"} gap={"0px"}>
        <CustomBtnSecondary label="Followers" variant={"ghost"} borderRadius={"none"} w={"50%"} borderBottom={"1px solid #3F3F3F"}/>
        <CustomBtnSecondary label="Following" variant={"ghost"} borderRadius={"none"} w={"50%"} borderBottom={"1px solid #3F3F3F"}/>
      </HStack>
    </Box>
  );
}
