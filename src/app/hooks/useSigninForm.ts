import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import fakeUser from "../datas/user.json";
import { useAuthStore } from "../store/auth";
import { User } from "../types/user";
import { SigninFormInputs, signinSchema } from "../utils/signin-schemas";

export const useSigninForm = () => {
  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormInputs>({
    mode: "onSubmit",
    resolver: zodResolver(signinSchema),
  });

  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit = useCallback(
    (data: SigninFormInputs) => {
      const user = fakeUser.find(
        (user) =>
          user.email === data.emailOrUsername ||
          user.username === data.emailOrUsername
      ) as User;

      if (
        !(user?.password === data.password) &&
        !((user?.email || user?.username) === data.emailOrUsername)
      ) {
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        
        return;
      }
      user.password = "";
      setUser(user);
      navigate("/");
    },
    [navigate, setUser]
  );

  return {
    register,
    onSubmit,
    handleSubmit,
    errors,
    isSubmitting,
    showAlert,
  };
};
