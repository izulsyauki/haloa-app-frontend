import { Flex } from "@chakra-ui/react";
import { SignupForm } from "../components/SignupForm";


export function SignupRoute() {
  return (
    <Flex justifyContent={"center"} minHeight={"100dvh"} alignItems={"center"}> 
      <SignupForm />
    </Flex>
  );
}
