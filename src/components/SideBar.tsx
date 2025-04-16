import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../utils/helper";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close sidebar on route change in mobile view
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  const adminNavigation: SidebarItem[] = [
    {
      title: "Dashboard",
      path: "/admin-dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { title: "Students", path: "/students", icon: <GraduationCap size={20} /> },
    { title: "Teachers", path: "/teachers", icon: <Users size={20} /> },
    { title: "Courses", path: "/courses", icon: <BookOpen size={20} /> },
    { title: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  const studentNavigation: SidebarItem[] = [
    { title: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { title: "Courses", path: "/courses", icon: <BookOpen size={20} /> },
    { title: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  const teacherNavigation: SidebarItem[] = [
    { title: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { title: "Students", path: "/students", icon: <GraduationCap size={20} /> },
    { title: "Courses", path: "/courses", icon: <BookOpen size={20} /> },
    { title: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  const getNavigation = () => {
    switch (userRole) {
      case "admin":
        return adminNavigation;
      case "student":
        return studentNavigation;
      case "teacher":
        return teacherNavigation;
      default:
        return adminNavigation; // Default to admin if role is not found
    }
  };

  const navigation = getNavigation();

  // Get current route for highlight
  const getCurrentRoute = () => {
    return (
      navigation.find((item) => item.path === location.pathname)?.title || ""
    );
  };

  // Sidebar variants for animations
  const sidebarVariants = {
    open: {
      width: 256,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      width: 72,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    mobile: {
      width: 256,
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    mobileClosed: {
      width: 256,
      x: -300,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // Overlay for mobile view
  const overlayVariants = {
    open: {
      opacity: 0.5,
      display: "block",
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      transitionEnd: { display: "none" },
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && (
        <motion.div
          className="fixed inset-0 bg-black z-20"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={overlayVariants}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Toggle button for mobile - fixed at the top left */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Main sidebar */}
      <motion.aside
        initial={isMobile ? "mobileClosed" : "open"}
        animate={
          isMobile
            ? isOpen
              ? "mobile"
              : "mobileClosed"
            : isOpen
            ? "open"
            : "closed"
        }
        variants={sidebarVariants}
        className={cn(
          "h-screen bg-background border-r dark:border-gray-700 p-4 z-30",
          isMobile ? "fixed left-0 top-0 shadow-lg" : "relative"
        )}
      >
        {/* Top section with logo/branding and toggle */}
        <div className="flex items-center justify-between mb-8">
          {/* Better positioned toggle button for desktop */}
          {!isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          )}

          {/* Close button for mobile view */}
          {isMobile && isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Close sidebar"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Current section indicator - only show on mobile when sidebar is open */}
        {isMobile && isOpen && (
          <div className="mb-6 px-2 py-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Current: {getCurrentRoute() || "Dashboard"}
          </div>
        )}

        {/* Navigation items */}
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2 rounded-lg transition-all duration-200",
                  isOpen ? "gap-3" : "justify-center",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                )
              }
            >
              <div className={cn(!isOpen && "mx-auto")}>{item.icon}</div>

              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Bottom section for user info or additional controls */}
        {/* <div className="absolute bottom-4 left-0 right-0 px-4">
          <div
            className={cn(
              "flex items-center p-2 rounded-lg",
              isOpen ? "gap-3" : "justify-center",
              "bg-gray-50 dark:bg-gray-800"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              {userRole && userRole[0].toUpperCase()}
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="truncate"
                >
                  <div className="text-sm font-medium">
                    {userRole
                      ? userRole.charAt(0).toUpperCase() + userRole.slice(1)
                      : "User"}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div> */}
      </motion.aside>
    </>
  );
};

export default Sidebar;
