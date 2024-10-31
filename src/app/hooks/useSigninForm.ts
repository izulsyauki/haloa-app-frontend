import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { SigninFormInputs, signinSchema } from "../utils/signinSchemas";
import API from "../libs/axios";
import { User } from "../types/user";
import Cookies from "js-cookie";

interface SignInResponse {
  user: User;
  token: string;
}

export const useSigninForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormInputs>({
    mode: "onSubmit",
    resolver: zodResolver(signinSchema),
  });

  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: SigninFormInputs) => {
      try {
        const response = await API.post<SignInResponse>("/auth/sign-in", data);
        const { user, token } = response.data;
        
        setUser(user);
        setToken(token);
        
        // Simpan token ke cookies expires30 hari
        Cookies.set("token", token, { expires: 30 });
        Cookies.set("user", JSON.stringify(user), { expires: 30 });
        
        // Set token sebagai default header untuk request selanjutnya
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
        setShowAlert(true);
        setErrorMessage("Email/username atau password salah. Silakan coba lagi.");
        
        setTimeout(() => {
          setShowAlert(false);
          setErrorMessage("");
        }, 3000);
      }
    },
    [navigate, setUser, setToken]
  );

  return {
    register,
    onSubmit,
    handleSubmit,
    errors,
    isSubmitting,
    showAlert,
    errorMessage,
  };
};
