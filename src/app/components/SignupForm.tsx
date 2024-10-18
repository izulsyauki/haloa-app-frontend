import {
  Checkbox,
  Flex,
  FormControl,
  Image,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { CustomBtnPrimary } from "./CustomBtnPrimary";
import Logo from "/assets/logo/logo.svg";
import { useSignupForm } from "../hooks/useSignupForm";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useSignupForm();

  return (
    <Flex flexDirection={"column"} w="368px" h="412px" gap="20px">
      <Image src={Logo} width={"108px"} />
      <Text>Create account Haloa!</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="3">
          <FormControl>
            <Input
              {...register("fullName")}
              placeholder="Full Name"
              border="1px solid #545454"
              paddingTop={"4px"}
              paddingBottom={"4px"}
            />
            {errors.fullName && (
              <Text color={"red.500"} fontSize={"xs"} marginTop={"2"} fontWeight={"medium"}>
                {errors.fullName.message}
              </Text>
            )}
          </FormControl>

          <FormControl>
            <Input
              {...register("username")}
              placeholder="Username"
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
              {...register("email")}
              type="email"
              placeholder="Email"
              border="1px solid #545454"
              paddingTop={"4px"}
              paddingBottom={"4px"}
            />
            {errors.email && (
              <Text
                color={"red.500"}
                fontSize={"xs"}
                marginTop={"2"}
                fontWeight={"medium"}
              >
                {errors.email.message}
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
              <Text
                color={"red.500"}
                fontSize={"xs"}
                marginTop={"2"}
                fontWeight={"medium"}
              >
                {errors.password.message}
              </Text>
            )}
          </FormControl>

          <Checkbox
            alignSelf={"start"}
            marginLeft={"2"}
            borderColor={"grey"}
            onChange={() => setShowPassword(!showPassword)}
          >
            Show Password
          </Checkbox>

          <CustomBtnPrimary isLoading={isSubmitting} label="Create" />
        </VStack>
      </form>

      <Text>
        Already have an account?{" "}
        <Link as={RouterLink} to="/sign-in" color="#3182CE">
          Sign in
        </Link>
      </Text>
    </Flex>
  );
}
