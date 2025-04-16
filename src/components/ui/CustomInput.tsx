import { FC, InputHTMLAttributes, useState } from "react";
import { cn } from "../../utils/helper";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  validate?: (value: string) => string | null;
  icon?: React.ReactNode; // left icon
  helperText?: string;
}

const CustomInput: FC<InputProps> = ({
  label,
  error,
  validate,
  className,
  icon,
  type,
  helperText,
  ...props
}) => {
  const [internalError, setInternalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const errorMessage = error || internalError;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (validate) {
      const validationError = validate(e.target.value);
      setInternalError(validationError);
    }
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  return (
    <div className="w-full space-y-2 mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          {...props}
          type={inputType}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={cn(
            "w-full rounded-lg border bg-transparent px-4 py-2.5 text-base transition-all duration-200",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            icon ? "pl-10" : "",
            isPassword ? "pr-10" : "",
            "focus:outline-none focus:ring-2",
            isFocused ? "shadow-sm" : "",
            errorMessage
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-900/30",
            className
          )}
        />

        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition-colors"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {errorMessage && (
        <div className="min-h-5 mt-1">
          <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
          {!errorMessage && helperText && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
