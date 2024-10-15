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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const signupSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignupFormIputs = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormIputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormIputs) => {
    console.log(data);
  };

  return (
    <Flex flexDirection={"column"} w="368px" h="412px" gap="20px">
      <Image src={Logo} width={"108px"} />
      <Text color={"white"}>Create account Haloa!</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="3">
          <FormControl>
            <Input
              {...register("fullName")}
              placeholder="Full Name"
              border="2px solid #545454"
              color={"white"}
              paddingTop={"4px"}
              paddingBottom={"4px"}
            />
            {errors.fullName && <Text color={"red.500"} fontSize={"xs"} marginTop={"2"}>{errors.fullName.message}</Text>}
          </FormControl>

          <FormControl>
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              border="2px solid #545454"
              color={"white"}
              paddingTop={"4px"}
              paddingBottom={"4px"}
            />
            {errors.email && <Text color={"red.500"} fontSize={"xs"} marginTop={"2"}>{errors.email.message}</Text>}
          </FormControl>

          <FormControl>
            <Input
              {...register("password")}
              type={showPassword ?  "text" : "password"}
              placeholder="Password"
              border="2px solid #545454"
              color={"white"}
              paddingTop={"4px"}
              paddingBottom={"4px"}
            />
            {errors.password && <Text color={"red.500"} fontSize={"xs"} marginTop={"2"}>{errors.password.message}</Text>}
          </FormControl>

          <Checkbox colorScheme="blue" color={"white"} alignSelf={"start"} marginLeft={"2"} onChange={() => setShowPassword(!showPassword)}>
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
            Create
          </Button>
        </VStack>
      </form>

      <Text color={"white"}>
        Already have an account?{" "}
        <Link as={RouterLink} to="/sign-in" color="#3182CE">
          Sign in
        </Link>
      </Text>
    </Flex>
  );
}
