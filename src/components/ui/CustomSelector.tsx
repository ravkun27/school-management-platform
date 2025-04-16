// CustomSelector.tsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectorProps {
  id: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  className?: string;
  compact?: boolean;
}

export const CustomSelector = ({
  id,
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error = false,
  className = "",
  compact = false,
}: CustomSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={id}
        className={`w-full flex items-center text-text justify-between 
          ${compact ? "px-3 py-1.5 text-sm" : "px-3 py-2"} 
          ${
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }
          rounded-md border shadow-sm text-text  
          ${disabled ? "bg-gray-100 text-gray-400" : ""} 
          focus:outline-none focus:ring-2 transition-all`}
      >
        <span
          className={`text-left truncate ${
            !selectedOption ? "text-gray-400" : "text-gray-900"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`ml-1 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto focus:outline-none ring-1 ring-black ring-opacity-5">
          <ul
            tabIndex={-1}
            role="listbox"
            aria-labelledby={id}
            className="py-0.5"
          >
            {options.map((option) => (
              <li
                key={option.value}
                id={`${id}-option-${option.value}`}
                role="option"
                aria-selected={option.value === value}
                className={`${
                  option.value === value
                    ? "bg-blue-50 text-blue-900"
                    : "text-gray-900 hover:bg-gray-50"
                } cursor-pointer select-none relative px-3 ${
                  compact ? "py-1.5 text-sm" : "py-2"
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
            {options.length === 0 && (
              <li className="text-gray-500 px-3 py-2 text-sm">
                No options available
              </li>
            )}
          </ul>
        </div>
      )}

      {required && !disabled && (
        <span className="absolute top-1/2 right-8 transform -translate-y-1/2 text-red-500 text-xs">
          *
        </span>
      )}
    </div>
  );
};
