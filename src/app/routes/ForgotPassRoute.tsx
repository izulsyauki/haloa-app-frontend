import { Flex } from "@chakra-ui/react";
import { ForgotPassForm } from "../components/ForgotPassForm";
import { ToggleColorMode } from "../components/ToggleColorMode";


export function ForgotPassRoute() {
  return (
    <Flex justifyContent={"center"} minHeight={"100dvh"} alignItems={"center"}> 
      <ToggleColorMode />
      <ForgotPassForm />
    </Flex>
  );
}
