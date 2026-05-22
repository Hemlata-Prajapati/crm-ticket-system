import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import TicketDetails from "./pages/TicketDetails";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/ticket/:ticket_id"
          element={<TicketDetails />}
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);