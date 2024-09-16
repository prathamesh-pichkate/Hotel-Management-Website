import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client"; // Import the API client
import { useAppContext } from "../contexts/AppContext"; // Import the custom context
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext(); // Access the showToast function from context
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  // Mutation for sending registration data to the server
  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registered Successfully!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  // Mutate to trigger the registration API call
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form action="" className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounder w-full py-1 px-2 font-normal"
            type="text"
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounder w-full py-1 px-2 font-normal"
            type="text"
            {...register("lastName", { required: "Last Name is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="border rounder w-full py-1 px-2 font-normal"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          className="border rounder w-full py-1 px-2 font-normal"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          className="border rounder w-full py-1 px-2 font-normal"
          type="password"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your password do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 font-bold hover:bg-blue-600 text-xl rounded-sm"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
