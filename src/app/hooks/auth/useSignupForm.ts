import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth";
import { SignupFormInputs, signupSchema } from "../../utils/signupSchemas";

export const useSignupForm = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: SignupFormInputs) => {
      return await signUp(data);
    },
    onSuccess: () => {
      toast({
        title: "Account created successfully!",
        description: "Please login with your new account",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/sign-in");
    },
    onError: (error: string) => {
      toast({
        title: "Failed to create account",
        description: error || "An error occurred, please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
    onMutate: () => {
      toast({
        title: "Loading...",
        description: "Were working on it...",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: mutation.isPending,
  };
};