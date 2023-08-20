import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

const FormWithReactHookform = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log("data -> ", data);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Email is required",
          maxLength: {
            value: 50,
            message: "Max length for email is 50",
          },
        })}
        type="email"
        placeholder="Email"
      />
      {errors.email && <p>{`${errors.email.message}`}</p>}
      <br />
      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 5,
            message: "Password must be at least 5 characters",
          },
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <p>{`${errors.password.message}`}</p>}
      <br />
      <input
        {...register("confirmPassword", {
          required: "Confirm password is required",
          validate: (value) =>
            value === getValues("password") || "Passwords must match",
        })}
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

export default FormWithReactHookform;
