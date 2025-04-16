// import { useAppDispatch, useAppSelector } from "../store/store";
// import { toggleTheme } from "../store/themeSlice";
import Button from "./ui/Button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  // const { mode } = useAppSelector((state) => state.theme);
  // const dispatch = useAppDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const handleThemeToggle = () => dispatch(toggleTheme());
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and School Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-md flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="w-8 h-8" />
              </div>

              <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                School Management Platform
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/students"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Students
            </Link>
            <Link
              to="/teachers"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Teachers
            </Link>
            <Link
              to="/courses"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Courses
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            {/* <Button
              onClick={handleThemeToggle}
              aria-label={`Switch to ${
                mode === "dark" ? "light" : "dark"
              } mode`}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button> */}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
            <Button>
              <Link to="/auth/sign-in" className="text-white">
                Login
              </Link>
            </Button>
            <Button className="hidden md:block">
              <Link to="/auth/sign-up" className="text-white">
                Register
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/students"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Students
            </Link>
            <Link
              to="/teachers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Teachers
            </Link>
            <Link
              to="/courses"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
