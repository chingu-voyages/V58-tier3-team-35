import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider";

import App from "./App";
import "./index.css";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
