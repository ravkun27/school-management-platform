import { cn } from "../../utils/helper";
interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

const Card = ({ title, description, className, children }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700",
        className
      )}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      {children}
    </div>
  );
};

export default Card;
