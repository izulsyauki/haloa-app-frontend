import API from "../libs/axios";
import { User } from "../types/user";
import { SigninFormInputs } from "../utils/signinSchemas";
import { SignupFormInputs } from "../utils/signupSchemas";

interface SignInResponse {
  user: User;
  token: string;
}

export const signIn = async (data: SigninFormInputs) => {
    return await API.post<SignInResponse>("/auth/sign-in", data).then((res) => res.data);
};

export const signUp = async (data: SignupFormInputs) => {
  return await API.post<{ user: User }>("/auth/sign-up", data).then((res) => res.data);
};  