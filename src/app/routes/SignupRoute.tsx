import { Flex } from "@chakra-ui/react";
import { SignupForm } from "../../components/SignupForm";


export function SignupRoute() {
  return (
    <Flex justifyContent={"center"} marginTop={"128px"} backgroundColor={"#1D1D1D"}> 
      <SignupForm />
    </Flex>
  );
}
