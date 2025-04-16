import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

import Button from "../components/ui/Button";
import CustomInput from "../components/ui/CustomInput";
import { validateEmail } from "../utils/helper";
import { login } from "../store/authSlice";
import { postFetch } from "../utils/apiCall";

interface SignInFormData {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  token: string;
  data?: {
    userRole: string;
  };
  message?: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);

    try {
      const res: ApiResponse = await postFetch("/user/auth/sign-in", data);

      if (res.success && res.token && res.data?.userRole) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.data.userRole);

        dispatch(login(res.token));
        navigate(`/${res.data.userRole}-dashboard`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-3xl mx-auto grid md:grid-cols-5 overflow-hidden rounded-2xl shadow-xl">
        {/* Left sidebar panel - visible on medium screens and up */}
        <div className="hidden md:flex md:col-span-2 bg-blue-600 dark:bg-blue-800 flex-col justify-between text-white p-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">EduLearn Platform</h1>
            <p className="text-blue-100 mb-8">
              Welcome back to your learning journey
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="px-4 py-6 bg-blue-700/30 rounded-lg mb-6"
            >
              <p className="italic text-blue-100">
                "The beautiful thing about learning is that no one can take it
                away from you."
              </p>
              <p className="text-right text-sm font-medium mt-2">– B.B. King</p>
            </motion.div>
          </div>

          <div className="mt-auto pt-8">
            <p className="text-xs text-blue-100">
              Need help? Contact our support team at
              <span className="block font-medium mt-1">
                support@edulearn.com
              </span>
            </p>
          </div>
        </div>

        {/* Main content panel */}
        <div className="md:col-span-3 bg-white dark:bg-gray-800">
          {/* Header for mobile only */}
          <div className="md:hidden bg-blue-600 dark:bg-blue-800 p-6 text-white">
            <h1 className="text-xl font-bold">Sign In</h1>
            <p className="text-blue-100 text-sm">
              Welcome back to our learning platform
            </p>
          </div>

          {/* Form content */}
          <div className="p-6 md:p-10">
            <div className="hidden md:block mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Sign in to your account to continue
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 max-w-md mx-auto"
            >
              <div className="space-y-4">
                <CustomInput
                  label="Email Address"
                  placeholder="Enter your email address"
                  icon={<Mail size={18} className="text-gray-400" />}
                  {...register("email", {
                    required: "Email is required",
                    validate: (value) =>
                      validateEmail(value) || "Please enter a valid email",
                  })}
                  error={errors.email?.message}
                />

                <CustomInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  icon={<Lock size={18} className="text-gray-400" />}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={errors.password?.message}
                />
              </div>

              <div className="flex justify-end items-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full py-2.5 text-base"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-300 pt-4">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
