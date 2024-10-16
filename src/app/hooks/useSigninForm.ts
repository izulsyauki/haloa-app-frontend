import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SigninForm, signinSchema } from "../utils/signin-schemas"
import { useAuthStore } from "../store/auth"
import { useNavigate } from "react-router-dom"
import { useCallback } from "react"
import fakeUser from "../datas/user.json";
import { User } from "../types/user"

export const useSigninForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninForm> ({
        mode: "onSubmit",
        resolver: zodResolver(signinSchema),
    });

    const { setUser } = useAuthStore();
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onSubmit = useCallback(
        (data: SigninForm) => {
            const user = fakeUser.find(
                (user) => 
                    user.email === data.emailOrUsername || user.username === data.emailOrUsername
            ) as User;

            if (!(user?.password === data.password)) return alert("Email atau Password salah, silahkan coba lagi!");

            user.password = "";
            setUser(user);
            navigate("/")
        }, [navigate, setUser]
    )

    return {
        register,
        onSubmit,
        handleSubmit,
        errors,
    };
}