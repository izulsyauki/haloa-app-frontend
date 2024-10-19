import { Flex } from "@chakra-ui/react";
import { SignupForm } from "../components/SignupForm";
import { ToggleColorMode } from "../components/ToggleColorMode";


export function SignupRoute() {
  return (
    <Flex justifyContent={"center"} minHeight={"100dvh"} alignItems={"center"}> 
      <ToggleColorMode />
      <SignupForm />
    </Flex>
  );
}
