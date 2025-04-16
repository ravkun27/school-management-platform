// App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AppRoutes from "./routes/AppRoutes";
import ThemeProvider from "./components/ThemeProvider";
import "./App.css";
import "./index.css";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppRoutes />
          <Toaster position="top-center" richColors /> {/* Must be rendered */}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
