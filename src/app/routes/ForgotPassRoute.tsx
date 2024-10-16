import { Flex } from "@chakra-ui/react";
import { ForgotPassForm } from "../../components/ForgotPassForm";


export function ForgotPassRoute() {
  return (
    <Flex justifyContent={"center"} marginTop={"128px"}> 
      <ForgotPassForm />
    </Flex>
  );
}
