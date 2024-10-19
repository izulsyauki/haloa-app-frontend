import { Flex } from "@chakra-ui/react";
import { SigninForm } from "../components/SigninForm";
import { ToggleColorMode } from "../components/ToggleColorMode";

export function SigninRoute() {
  return (
    <Flex justifyContent={"center"} minHeight={"100dvh"} alignItems={"center"}>
      <ToggleColorMode />
      <SigninForm />
    </Flex>
  );
}
