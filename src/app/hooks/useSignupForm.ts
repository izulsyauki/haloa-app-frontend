import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupFormInputs, signupSchema } from "../utils/signupSchemas";

export const useSignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<SignupFormInputs>({
        resolver: zodResolver(signupSchema),
      });
    
      const onSubmit = (data: SignupFormInputs) => {
        console.log(data);
      };

      return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting
      }
}