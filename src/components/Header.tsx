import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleTheme } from "../store/themeSlice";
import Button from "./ui/Button";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom"; // or next/link if Next.js

const Header = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const handleThemeToggle = () => dispatch(toggleTheme());

  return (
    <header
      className="w-full h-12 border-b bg-white dark:bg-gray-900 dark:border-gray-700 p-4 md:px-8 flex items-center justify-between"
      role="banner"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2" title="Go to homepage">
        <img
          src="/logo.png"
          alt="Company Logo"
          className="w-10 h-10 object-contain"
        />
        <span className="text-lg font-semibold hidden sm:inline text-gray-800 dark:text-white">
          School Name
        </span>
      </Link>

      {/* Theme Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleThemeToggle}
        aria-label="Toggle dark mode"
        title="Toggle dark/light theme"
      >
        <span className="sr-only">Toggle theme</span>
        {mode === "dark" ? (
          <Sun size={20} className="text-yellow-400" />
        ) : (
          <Moon size={20} className="text-gray-700 dark:text-gray-200" />
        )}
      </Button>
    </header>
  );
};

export default Header;
