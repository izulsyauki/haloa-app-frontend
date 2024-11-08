import {
  Checkbox,
  Flex,
  FormControl,
  Image,
  Input,
  Link,
  Text,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSigninForm } from "../hooks/auth/useSigninForm";
import { CustomBtnPrimary } from "./CustomBtn";
import Logo from "/assets/logo/logo.svg";

export function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, onSubmit, errors, isSubmitting } = useSigninForm();


  return (
    <>
    <Flex flexDirection={"column"} w="368px" h="412px" gap="20px">
      <Image src={Logo} width={"108px"} />
      <Text>Hi, welcome to Haloa!</Text>

      <form onSubmit={onSubmit}>
        <VStack spacing="3">
          <FormControl>
            <Input
              {...register("username")}
              placeholder="Email/Username"
              border="1px solid #545454"
              paddingTop={"4px"}
              paddingBottom={"4px"}
            />
            {errors.username && (
              <Text color={"red.500"} fontSize={"xs"} marginTop={"2"} fontWeight={"medium"}>
                {errors.username.message}
              </Text>
            )}
          </FormControl>

          <FormControl>
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              border="1px solid #545454"
              paddingTop={"4px"}
              paddingBottom={"4px"}
            />
            {errors.password && (
              <Text color={"red.500"} fontSize={"xs"} marginTop={"2"} fontWeight={"medium"}>
                {errors.password.message}
              </Text>
            )}
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

          <CustomBtnPrimary isLoading={isSubmitting} label="Enter" type="submit" />
        </VStack>
      </form>

      <Text>
        Dont have an account?{" "}
        <Link as={RouterLink} to="/sign-up" color="#3182CE">
          Sign up
        </Link>
      </Text>
    </Flex>
    </>
  );
}
