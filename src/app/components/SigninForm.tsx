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
      <Text>Hi, welcome to Haloa!</Text>

      <VStack spacing="3">
        <FormControl>
          <Input
            placeholder="Email/FullName"
            border="1px solid #545454"
            paddingTop={"4px"}
            paddingBottom={"4px"}
          />
        </FormControl>
        <FormControl>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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

        <Link as={RouterLink} to="/forgot-password" ml={"auto"}>
          Forgot Password?
        </Link>

        <Button
          marginTop={"3"}
          type="submit"
          colorScheme="blue"
          width="full"
          borderRadius={"6px"}
        >
          Enter
        </Button>
      </VStack>

      <Text>
        Dont have an account?{" "}
        <Link as={RouterLink} to="/sign-up" color="#3182CE">
          Sign up
        </Link>
      </Text>
    </Flex>
  );
}
