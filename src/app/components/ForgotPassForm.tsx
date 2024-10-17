import {
  Flex,
  FormControl,
  Image,
  Input,
  Link,
  Text,
  VStack
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { z } from "zod";
import { CustomBtnPrimary } from "./CustomBtnPrimary";
import Logo from "/assets/logo/logo.svg";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPassInputs = z.infer<typeof signupSchema>;

export function ForgotPassForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassInputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: ForgotPassInputs) => {
    console.log(data);
  };

  return (
    <Flex flexDirection={"column"} w="368px" h="412px" gap="20px">
      <Image src={Logo} width={"108px"} />
      <Text>Forgot Password</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="3">
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
              <Text color={"red.500"} fontSize={"xs"} marginTop={"2"} fontWeight={"medium"}>
                {errors.email.message}
              </Text>
            )}
          </FormControl>

          <CustomBtnPrimary label="Send Instruction" />
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
