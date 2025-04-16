import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Students from "../pages/Students";
// import Teachers from "../pages/Teachers";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { ErrorBoundary } from "react-error-boundary";
import TeacherDashboard from "../pages/TeacherDashboard";
import LandingPage from "../pages/LandingPage";
import AdminSignIn from "../pages/AdminSignIn";
import AdminSignUp from "../pages/AdminSignUp";
import AdminDashboard from "../pages/AdminDashboard";
import Teachers from "../pages/Teachers";
// import { useAppSelector } from "../store/store";

// ErrorFallback Component to display in case of error
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div
      role="alert"
      className="p-4 border border-red-500 rounded-md text-red-500"
    >
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

// PrivateRoute Component
// const PrivateRoute = ({
//   element,
//   allowedRoles,
// }: {
//   element: JSX.Element;
//   allowedRoles: string[];
// }) => {
//   const role = useAppSelector((state) => state.user.role);

//   if (!role) return <SignIn />; // Redirect to SignIn if not authenticated
//   if (!allowedRoles.includes(role)) return <div>Access Denied</div>;

//   return element;
// };

// Define your router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true, // this makes it render on "/"
        element: <LandingPage />,
      },
      {
        path: "home",
        element: <LandingPage />,
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "students",
        element: (
          <Students />
          // <PrivateRoute element={<Students />} allowedRoles={["student"]} />
        ),
      },
      {
        path: "teachers",
        element: (
          <Teachers />
          // <PrivateRoute element={<Students />} allowedRoles={["student"]} />
        ),
      },
      {
        path: "teacher-dashboard",
        element: (
          <TeacherDashboard />
          // <PrivateRoute element={<Teachers />} allowedRoles={["teacher"]} />
        ),
      },
      // {
      //   path: "admin",
      //   element: (
      //     // <PrivateRoute element={<Admin />} allowedRoles={["admin"]} />
      //   ),
      // },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "admin/sign-in", element: <AdminSignIn /> },
      { path: "admin/sign-up", element: <AdminSignUp /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
]);

// AppRoutes Component
export default function AppRoutes() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
