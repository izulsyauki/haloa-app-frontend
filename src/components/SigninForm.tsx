import {
  Button,
  Input,
  Text,
  VStack,
  Link,
  FormControl,
  Flex,
  Image,
  Checkbox,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "/assets/logo/logo.svg";
import { useState } from "react";

export function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex flexDirection={"column"} w="368px" h="412px" gap="20px">
      <Image src={Logo} width={"108px"} />
      <Text color={"white"}>Hi, welcome to Haloa!</Text>

      <VStack spacing="3">
        <FormControl>
          <Input
            placeholder="Email/FullName"
            border="2px solid #545454"
            color={"white"}
            paddingTop={"4px"}
            paddingBottom={"4px"}
          />
        </FormControl>
        <FormControl>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            border="2px solid #545454"
            color={"white"}
            paddingTop={"4px"}
            paddingBottom={"4px"}
          />
        </FormControl>

        <Checkbox
          colorScheme="blue"
          color={"white"}
          alignSelf={"start"}
          marginLeft={"2"}
          onChange={() => setShowPassword(!showPassword)}
        >
          Show Password
        </Checkbox>

        <Button
          marginTop={"3"}
          type="submit"
          colorScheme="blue"
          width="full"
          color={"white"}
          borderRadius={"6px"}
        >
          Enter
        </Button>
      </VStack>

      <Text color={"white"}>
        Dont have an account?{" "}
        <Link as={RouterLink} to="/sign-up" color="#3182CE">
          Sign up
        </Link>
      </Text>
    </Flex>
  );
}
