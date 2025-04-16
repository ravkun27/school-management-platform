import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/";
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {!isRoot && <Sidebar />}
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
