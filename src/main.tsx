import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Navbar from "./components/Navbar.tsx";
import "./index.css";
import { ConfigContextProvider } from "./context/ConfigContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigContextProvider>
      <BrowserRouter>
        <Navbar />
        <App />
      </BrowserRouter>
    </ConfigContextProvider>
  </React.StrictMode>,
);
