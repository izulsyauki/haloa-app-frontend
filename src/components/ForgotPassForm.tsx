import {
  Button,
  Input,
  Text,
  VStack,
  Link,
  FormControl,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "/assets/logo/logo.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
      <Text>Create account Haloa!</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="3">
          <FormControl>
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              border="2px solid #545454"
              paddingTop={"4px"}
              paddingBottom={"4px"}
            />
            {errors.email && (
              <Text color={"red.500"} fontSize={"xs"} marginTop={"2"} fontWeight={"medium"}>
                {errors.email.message}
              </Text>
            )}
          </FormControl>

          <Button
            marginTop={"3"}
            type="submit"
            colorScheme="blue"
            width="full"
            borderRadius={"6px"}
          >
            Create
          </Button>
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
