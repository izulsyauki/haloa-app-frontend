import { Flex } from "@chakra-ui/react";
import { ResetPassForm } from "../components/ResetPassForm";
import { ToggleColorMode } from "../components/ToggleColorMode";


export function ResetPassRoute() {
  return (
    <Flex justifyContent={"center"} minHeight={"100dvh"} alignItems={"center"}> 
      <ToggleColorMode />
      <ResetPassForm />
    </Flex>
  );
}
