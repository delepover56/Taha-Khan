// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router"; // make sure this file exists
import { AppLoaderProvider } from "@/context/AppLoaderContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppLoaderProvider>
      <RouterProvider router={router} />
    </AppLoaderProvider>
  </StrictMode>
);
