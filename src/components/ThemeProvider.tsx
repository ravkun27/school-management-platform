import { useEffect } from "react";
import { useAppSelector } from "../store/store";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(mode === "dark" ? "light" : "dark");
    root.classList.add(mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

  return <>{children}</>;
};

export default ThemeProvider;
