import { Flex } from "@chakra-ui/react";
import { SigninForm } from "../../components/SigninForm";

export function SigninRoute() {
  return (
    <Flex justifyContent={"center"} minHeight={"100vh"} alignItems={"center"}> 
      <SigninForm />
    </Flex>
  );
}
