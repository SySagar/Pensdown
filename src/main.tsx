import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Apptheme from "./theme/Apptheme.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Apptheme>
    <Toaster position="top-right" />
    <App />
  </Apptheme>
);
