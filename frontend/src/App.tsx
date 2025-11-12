import { RouterProvider } from "react-router";
import router from "./router";
import { Provider } from "./components/ui/provider";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
