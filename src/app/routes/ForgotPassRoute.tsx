import { Flex } from "@chakra-ui/react";
import { ForgotPassForm } from "../components/ForgotPassForm";


export function ForgotPassRoute() {
  return (
    <Flex justifyContent={"center"} minHeight={"100dvh"} alignItems={"center"}> 
      <ForgotPassForm />
    </Flex>
  );
}
