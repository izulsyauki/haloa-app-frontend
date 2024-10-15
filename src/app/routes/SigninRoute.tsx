import { Flex } from "@chakra-ui/react";
import { SigninForm } from "../../components/SigninForm";

export function SigninRoute() {
  return (
    <Flex
      justifyContent={"center"}
      marginTop={"128px"}
      backgroundColor={"#1D1D1D"}
    >
      <SigninForm />
    </Flex>
  );
}
