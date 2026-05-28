import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./index.css";

import App from "./App.jsx";

import History from "./History.jsx";

createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <BrowserRouter>

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={<App />}
        />

        {/* History Page */}
        <Route
          path="/history"
          element={<History />}
        />

      </Routes>

    </BrowserRouter>

  </StrictMode>
);