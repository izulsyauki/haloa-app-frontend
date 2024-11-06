import API from "../libs/axios";
import { User } from "../types/user";
import { SigninFormInputs } from "../utils/signinSchemas";
import { SignupFormInputs } from "../utils/signupSchemas";

interface SignInResponse {
  user: User;
  token: string;
}

interface ForgotPasswordResponse {
  message: string;
}

interface ResetPasswordResponse {
  message: string;
}

export const signIn = async (data: SigninFormInputs) => {
    return await API.post<SignInResponse>("/auth/sign-in", data).then((res) => res.data);
};

export const signUp = async (data: SignupFormInputs) => {
  return await API.post<{ user: User }>("/auth/sign-up", data).then((res) => res.data);
};

export const forgotPassword = async (email: string) => {
  console.log("Sending forgot password request for email:", email);
  return await API.post<ForgotPasswordResponse>("/auth/forgot-password", { email })
    .then((res) => {
      console.log("Forgot password response:", res.data);
      return res.data;
    });
};

export const resetPassword = async (token: string, newPassword: string) => {
  console.log("Sending reset password request");
  return await API.post<ResetPasswordResponse>(`/auth/reset-password/${token}`, {
    newPassword,
  }).then((res) => {
    console.log("Reset password response:", res.data);
    return res.data;
  });
};  