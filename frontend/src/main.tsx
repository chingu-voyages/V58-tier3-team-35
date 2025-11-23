import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import App from "./App";
import "./index.css";
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <App />
        <Toaster richColors />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
