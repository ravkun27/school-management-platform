import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex-1">
        <Header />
        <main className="p-6 flex justify-center items-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
