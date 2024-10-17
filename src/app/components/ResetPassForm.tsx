import {
  Checkbox,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { CustomBtnPrimary } from "./CustomBtnPrimary";
import Logo from "/assets/logo/logo.svg";

export function ResetPassForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex flexDirection={"column"} w="368px" h="412px" gap="20px">
      <Image src={Logo} width={"108px"} />
      <Text>Reset Password</Text>

      <VStack spacing="3">
        <FormControl>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            border="1px solid #545454"
            paddingTop={"4px"}
            paddingBottom={"4px"}
          />
        </FormControl>

        <FormControl>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            border="1px solid #545454"
            paddingTop={"4px"}
            paddingBottom={"4px"}
          />
        </FormControl>

        <Checkbox
          borderColor={"grey"}
          alignSelf={"start"}
          marginLeft={"2"}
          onChange={() => setShowPassword(!showPassword)}
        >
          Show Password
        </Checkbox>

        <CustomBtnPrimary label="Reset Password" />
      </VStack>

    </Flex>
  );
}
