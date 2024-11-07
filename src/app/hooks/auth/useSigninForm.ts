import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/auth";
import API from "../../libs/axios";
import { useAuthStore } from "../../store/auth";
import { SigninFormInputs, signinSchema } from "../../utils/signinSchemas";

export const useSigninForm = () => {
  const toast = useToast();
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormInputs>({
    mode: "onSubmit",
    resolver: zodResolver(signinSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: SigninFormInputs) => {
      return await signIn(data);
    },
    onSuccess: (data) => {
      const { user, token } = data;
      
      setUser(user);
      setToken(token);
      
      Cookies.set("token", token, { expires: 30 });
      Cookies.set("user", JSON.stringify(user), { expires: 30 });
      
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      setTimeout(() => {
        toast({
          title: "Welcome back!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }, 3000);

      navigate("/");
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Check your email/username or password and try again.",
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
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    register,
    onSubmit,
    handleSubmit,
    errors,
    isSubmitting: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
