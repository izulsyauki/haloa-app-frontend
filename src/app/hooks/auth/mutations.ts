import { useMutation } from "@tanstack/react-query";
import { forgotPassword, resetPassword } from "../../api/auth";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const useForgotPasswordMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (email: string) => {
      return forgotPassword(email);
    },
    onSuccess: () => {
      toast({
        title: "Email Sent",
        description: "Please check your email for reset password instructions",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "An error occurred while sending the email",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
};

export const useResetPasswordMutation = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) => {
      return resetPassword(token, newPassword);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password reset successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "An error occurred while resetting the password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
}; 