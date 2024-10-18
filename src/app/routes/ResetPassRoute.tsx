import { Flex } from "@chakra-ui/react";
import { ResetPassForm } from "../components/ResetPassForm";


export function ResetPassRoute() {
  return (
    <Flex justifyContent={"center"} minHeight={"100dvh"} alignItems={"center"}> 
      <ResetPassForm />
    </Flex>
  );
}
