
import { createRoot } from "react-dom/client";
import "./index.css";
import 'leaflet/dist/leaflet.css';

import { StrictMode } from "react";
import  {router}  from "./Router/Router";
import { RouterProvider } from "react-router";
import AuthProvider from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>
);
