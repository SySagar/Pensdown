import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Apptheme from "./theme/Apptheme.tsx";
import { Toaster } from "react-hot-toast";
import { Helmet } from 'react-helmet';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Apptheme>
     <Helmet>
        <title>Pensdown</title>
      </Helmet>
    <Toaster position="top-right" />
    <App />
  </Apptheme>
);
