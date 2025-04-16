import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Key } from "lucide-react";

import CustomInput from "../components/ui/CustomInput";
import Button from "../components/ui/Button";
import { postFetch } from "../utils/apiCall";

interface AdminSignUpData {
  fullName: string;
  email: string;
  password: string;
  role: string;
  otp: string;
}

const AdminSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminSignUpData>({ mode: "onBlur" });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: AdminSignUpData) => {
    setError("");
    try {
      data.role = "admin"; // fixed role
      const res: any = await postFetch("/admin/auth/sign-up", data);
      if (res.success) {
        navigate("/auth/admin/sign-in");
      } else {
        setError(res.message || "Sign up failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Admin Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <CustomInput
            label="Full Name"
            placeholder="Super Admin"
            icon={<User size={18} />}
            {...register("fullName", { required: "Full name is required" })}
            error={errors.fullName?.message}
          />

          <CustomInput
            label="Email"
            type="email"
            placeholder="admin@school.com"
            icon={<Mail size={18} />}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            error={errors.email?.message}
          />

          <CustomInput
            label="OTP"
            placeholder="Enter OTP"
            icon={<Key size={18} />}
            {...register("otp", { required: "OTP is required" })}
            error={errors.otp?.message}
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
                message: "Minimum 6 characters",
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
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-300 pt-4">
            Already have an admin account?{" "}
            <Link
              to="/auth/admin/sign-in"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignUp;
