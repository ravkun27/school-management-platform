import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  BookOpen,
  Briefcase,
  ArrowRight,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

import Button from "../components/ui/Button";
import CustomInput from "../components/ui/CustomInput";
import { validateEmail } from "../utils/helper";
import { login } from "../store/authSlice";
import { postFetch } from "../utils/apiCall";

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
  role: string;
}

interface ApiResponse {
  success: boolean;
  token: string;
  message?: string;
}

interface RoleOption {
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
      role: "student",
    },
    mode: "onChange",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Reset timer when OTP is sent
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && resendDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, resendDisabled]);

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // Handle the change of role
  const handleRoleChange = (newRole: string) => {
    setValue("role", newRole);
  };

  // Send OTP for email verification
  const handleSendOTP = async () => {
    // Validate email and name first
    const isValid = await trigger(["email", "fullName"]);
    if (!isValid) return;

    const email = watch("email");
    setOtpLoading(true);
    setError("");

    try {
      const res: ApiResponse = await postFetch(
        "/user/auth/send-verification-otp",
        { email }
      );

      if (res.success) {
        setOtpSent(true);
        setResendDisabled(true);
        setError("");
      } else {
        setError(
          res.message || "Failed to send verification code. Please try again."
        );
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // Step navigation
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof SignUpFormData)[] = [];

    switch (currentStep) {
      case 1: // Basic info and OTP
        fieldsToValidate = ["fullName", "email", "otp"];
        break;
      case 2: // Password step
        fieldsToValidate = ["password", "confirmPassword"];
        break;
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Submit form data when everything is valid
  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    setError("");

    const requestBody = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role,
      otp: data.otp,
    };

    try {
      const res: ApiResponse = await postFetch(
        "/user/auth/sign-up",
        requestBody
      );

      if (res.success) {
        // Save role and token to localStorage
        localStorage.setItem("role", data.role);
        localStorage.setItem("token", res.token);

        // Dispatch login action to save auth state in Redux
        dispatch(login(res.token));

        // Show success animation
        setCurrentStep(3);

        // Redirect user after a short delay
        setTimeout(() => {
          navigate(`/${data.role}-dashboard`);
        }, 2000);
      } else {
        setError(res.message || "Failed to create account. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const roles: RoleOption[] = [
    {
      label: "Student",
      value: "student",
      icon: <BookOpen size={24} />,
      description: "Access learning materials and join classes",
    },
    {
      label: "Teacher",
      value: "teacher",
      icon: <Briefcase size={24} />,
      description: "Create courses and manage students",
    },
  ];

  // Progress labels for each step
  const stepLabels = ["Account Details", "Security", "Completion"];

  // Render specific step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Basic info and OTP
        return (
          <motion.div
            key="step1"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="space-y-6"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Choose your role</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Select the role that best fits your needs
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <motion.div
                    key={role.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoleChange(role.value)}
                    className={`flex items-center p-4 rounded-lg cursor-pointer border-2 transition-all ${
                      watch("role") === role.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                      {role.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">{role.label}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {role.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <CustomInput
              label="Full Name"
              icon={<User size={18} className="text-gray-400" />}
              placeholder="Enter your full name"
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              error={errors.fullName?.message}
              helperText="Your name as it will appear on your profile"
            />

            <div className="space-y-4">
              <CustomInput
                label="Email Address"
                icon={<Mail size={18} className="text-gray-400" />}
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => validateEmail(value),
                })}
                error={errors.email?.message}
                disabled={otpSent}
                helperText="We'll use this email for verification and account access"
              />

              {!otpSent ? (
                <Button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={
                    otpLoading ||
                    !watch("email") ||
                    !watch("fullName") ||
                    !!errors.email ||
                    !!errors.fullName
                  }
                  className="w-full py-2.5"
                >
                  {otpLoading ? "Sending..." : "Send Verification Code"}
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-700 dark:text-blue-300 flex items-start">
                      <CheckCircle
                        size={16}
                        className="mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span>
                        We've sent a verification code to{" "}
                        <strong>{watch("email")}</strong>
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1">
                      <CustomInput
                        label="Verification Code"
                        placeholder="Enter the 6-digit code"
                        {...register("otp", {
                          required: "Code is required",
                          minLength: {
                            value: 4,
                            message: "Enter a valid code",
                          },
                        })}
                        error={errors.otp?.message}
                      />
                    </div>

                    <Button
                      type="button"
                      variant="accent"
                      onClick={handleSendOTP}
                      disabled={resendDisabled}
                      className="md:h-10 text-sm whitespace-nowrap"
                    >
                      {resendDisabled
                        ? `Resend in ${countdown}s`
                        : "Resend Code"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {otpSent && (
              <Button
                type="button"
                onClick={handleNextStep}
                className="w-full py-2.5 mt-4 flex items-center justify-center"
                disabled={!watch("otp") || !!errors.otp}
              >
                <span>Continue to Password Setup</span>
                <ArrowRight size={16} className="ml-2" />
              </Button>
            )}
          </motion.div>
        );

      case 2: // Password setup
        return (
          <motion.div
            key="step2"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="space-y-6"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">
                Create a Strong Password
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Secure your new {watch("role")} account
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                For your security, your password should include:
              </p>
              <ul className="text-sm text-start list-disc pl-5 text-blue-700 dark:text-blue-300 space-y-1">
                <li>At least 8 characters in length</li>
                <li>Upper and lowercase letters</li>
                <li>Numbers and special characters</li>
              </ul>
            </div>

            <CustomInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock size={18} className="text-gray-400" />}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must include uppercase, lowercase, number and special character",
                },
              })}
              error={errors.password?.message}
            />

            <CustomInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              icon={<Lock size={18} className="text-gray-400" />}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={errors.confirmPassword?.message}
            />

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
              <Button
                type="button"
                variant="accent"
                onClick={handlePrevStep}
                className="flex items-center justify-center"
              >
                <ArrowLeft size={16} className="mr-2" />
                <span>Back</span>
              </Button>

              <Button
                type="submit"
                className="flex-1 py-2.5"
                disabled={loading || !isValid}
              >
                {loading ? "Creating Account..." : "Complete Sign Up"}
              </Button>
            </div>
          </motion.div>
        );

      case 3: // Success
        return (
          <motion.div
            key="step3"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeVariants}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/40 mx-auto flex items-center justify-center mb-6"
            >
              <CheckCircle
                className="text-green-500 dark:text-green-400"
                size={48}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold mb-3"
            >
              Account Created Successfully!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 dark:text-gray-300 mb-6 mx-auto max-w-md"
            >
              Welcome to our platform! You're now being redirected to your{" "}
              {watch("role")} dashboard...
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-16 h-1.5 bg-blue-500/30 rounded-full mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>
        );
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
              Join thousands of learners worldwide
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Learn at your own pace</h3>
                  <p className="text-sm text-blue-200 mt-1">
                    Access courses anytime, anywhere
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Expert instructors</h3>
                  <p className="text-sm text-blue-200 mt-1">
                    Learn from industry professionals
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Interactive learning</h3>
                  <p className="text-sm text-blue-200 mt-1">
                    Engage with hands-on exercises
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <p className="text-sm text-blue-100">
              "Education is the passport to the future, for tomorrow belongs to
              those who prepare for it today."
            </p>
            <p className="text-sm font-medium mt-2">– Malcolm X</p>
          </div>
        </div>

        {/* Main content panel */}
        <div className="md:col-span-3 bg-white dark:bg-gray-800">
          {/* Header for mobile only */}
          <div className="md:hidden bg-blue-600 dark:bg-blue-800 p-6 text-white">
            <h1 className="text-xl font-bold">Create Your Account</h1>
            <p className="text-blue-100 text-sm">
              Join our learning platform today
            </p>
          </div>

          {/* Progress bar */}
          {currentStep < 3 && (
            <div className="px-6 pt-6 pb-4">
              <div className="flex justify-between items-center mb-1">
                {stepLabels.map((label, idx) => (
                  <span
                    key={idx}
                    className={`text-xs font-medium ${
                      idx <= currentStep - 1
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {idx < currentStep && "✓ "}
                    {label}
                  </span>
                ))}
              </div>
              <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300 ease-out rounded-full"
                  style={{
                    width: `${(currentStep / stepLabels.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Form content */}
          <div className="px-6 py-4 md:p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6 flex items-start"
              >
                <div className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm ml-3 text-red-600 dark:text-red-400">
                  {error}
                </p>
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md mx-auto"
            >
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>
            </form>

            {/* Sign in link */}
            {currentStep < 3 && (
              <div className="text-center mt-8">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Already have an account?{" "}
                  <Link
                    to="/auth/sign-in"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
