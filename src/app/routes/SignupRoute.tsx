import { Flex } from "@chakra-ui/react";
import { SignupForm } from "../../components/SignupForm";


export function SignupRoute() {
  return (
    <Flex justifyContent={"center"} minHeight={"100vh"} alignItems={"center"}> 
      <SignupForm />
    </Flex>
  );
}
