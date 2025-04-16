import { FC } from "react";
import { cn } from "../../utils/helper";
import {
  IconAlertCircle,
  IconCheck,
  IconInfoCircle,
} from "@tabler/icons-react";

type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps {
  variant: AlertVariant;
  title: string;
  message: string;
  className?: string;
}

const Alert: FC<AlertProps> = ({ variant, title, message, className }) => {
  const variants = {
    success:
      "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300",
    error: "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300",
  };

  const icons = {
    success: <IconCheck className="w-5 h-5" />,
    error: <IconAlertCircle className="w-5 h-5" />,
    warning: <IconAlertCircle className="w-5 h-5" />,
    info: <IconInfoCircle className="w-5 h-5" />,
  };

  return (
    <div
      className={cn(
        "rounded-lg p-4 flex gap-3 z-50",
        variants[variant],
        className
      )}
    >
      <div className="flex-shrink-0">{icons[variant]}</div>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Alert;
