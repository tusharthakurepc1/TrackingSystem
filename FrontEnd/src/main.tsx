import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "rsuite/dist/rsuite.min.css";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CustomProvider theme="light">
      <App />
    </CustomProvider>
  </React.StrictMode>
);
