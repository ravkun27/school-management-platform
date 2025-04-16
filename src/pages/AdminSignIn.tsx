import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";

import Button from "../components/ui/Button";
import CustomInput from "../components/ui/CustomInput";
import { postFetch } from "../utils/apiCall";

interface AdminLoginData {
  email: string;
  password: string;
}

const AdminSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginData>({
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data: AdminLoginData) => {
    setError("");

    try {
      const res: any = await postFetch("/admin/auth/sign-in", data);

      if (res.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.userRole);

        navigate("/admin-dashboard");
      } else {
        setError(res.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Admin Portal
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <CustomInput
            label="Email"
            type="email"
            placeholder="admin@school.com"
            icon={<Mail size={18} />}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            error={errors.email?.message}
          />

          <CustomInput
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={errors.password?.message}
          />

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 pt-4">
            Create Admin Account?
            <Link
              to="/auth/admin/sign-up"
              className="text-blue-600 dark:text-blue-400 pl-1 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;
