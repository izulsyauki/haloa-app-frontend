import {
  Checkbox,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "/assets/logo/logo.svg";
import { CustomBtnPrimary } from "./CustomBtn";
import { useResetPasswordMutation } from "../hooks/auth/mutations";
import { resetPasswordSchema, ResetPasswordInputs } from "../utils/resetPassSchema";

export function ResetPassForm() {
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const resetPasswordMutation = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInputs) => {
    if (!token) {
      return;
    }

    resetPasswordMutation.mutate({
      token,
      newPassword: data.newPassword,
    });
  };

  return (
    <Flex flexDirection={"column"} w="368px" h="412px" gap="20px">
      <Image src={Logo} width={"108px"} />
      <Text>Reset Password</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="3">
          <FormControl>
            <Input
              {...register("newPassword")}
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              border="1px solid #545454"
              paddingTop={"4px"}
              paddingBottom={"4px"}
              isDisabled={resetPasswordMutation.isPending}
            />
            {errors.newPassword && (
              <Text color={"red.500"} fontSize={"xs"} marginTop={"2"} fontWeight={"medium"}>
                {errors.newPassword.message}
              </Text>
            )}
          </FormControl>

          <FormControl>
            <Input
              {...register("confirmPassword")}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              border="1px solid #545454"
              paddingTop={"4px"}
              paddingBottom={"4px"}
              isDisabled={resetPasswordMutation.isPending}
            />
            {errors.confirmPassword && (
              <Text color={"red.500"} fontSize={"xs"} marginTop={"2"} fontWeight={"medium"}>
                {errors.confirmPassword.message}
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

          <CustomBtnPrimary 
            label={resetPasswordMutation.isPending ? "Saving..." : "Reset Password"} 
            isLoading={resetPasswordMutation.isPending}
          />
        </VStack>
      </form>
    </Flex>
  );
}
