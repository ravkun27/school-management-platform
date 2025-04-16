import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../utils/helper";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const userRole = localStorage.getItem("userRole");

  const adminNavigation: SidebarItem[] = [
    { title: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
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

  return (
    <motion.aside
      animate={{ width: isOpen ? 256 : 72 }} // Tailwind w-64 and w-16
      className="relative h-screen border-r bg-background p-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-4 z-10 rounded-full bg-white shadow p-1 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {isOpen ? <ChevronsLeft size={16} /> : <ChevronsRight size={16} />}
      </button>

      <nav className="space-y-1 mt-8">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center px-2 py-2 rounded-lg transition-colors whitespace-nowrap",
                isOpen ? "gap-3" : "justify-center",
                isActive
                  ? "bg-primary text-white"
                  : "text-text hover:bg-gray-100 dark:hover:bg-gray-700"
              )
            }
          >
            {item.icon}
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {item.title}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
