import API from "../libs/axios";
import { User } from "../types/user";
import { SigninFormInputs } from "../utils/signinSchemas";

interface SignInResponse {
  user: User;
  token: string;
}

export const signIn = async (data: SigninFormInputs) => {
    return await API.post<SignInResponse>("/auth/sign-in", data).then((res) => res.data);
};