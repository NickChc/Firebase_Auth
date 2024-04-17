import React from "react";
import ReactDOM from "react-dom/client";
import App from "@src/App.tsx";
import { Providers } from "@src/Providers/Providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
