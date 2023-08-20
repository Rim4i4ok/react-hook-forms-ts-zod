import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type TSignUpSchema = z.infer<typeof signUpSchema>;

const FormWithReactHookformWithZod = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    console.log("data -> ", data);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="email" placeholder="Email" />
      {errors.email && <p>{`${errors.email.message}`}</p>}
      <br />
      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <p>{`${errors.password.message}`}</p>}
      <br />
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm password"
      />
      {errors.confirmPassword && <p>{`${errors.confirmPassword.message}`}</p>}
      <br />
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default FormWithReactHookformWithZod;
