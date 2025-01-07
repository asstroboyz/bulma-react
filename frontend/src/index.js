
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/Admin/Admin.js";
import RTLLayout from "./layouts/RTL/RTL.js";
import "./assets/css/black-dashboard-react.css";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper.js";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper.js";
import Login from "paginate/Login.js";
import Register from "paginate/Register.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/rtl/*" element={<RTLLayout />} />
          <Route
            path="*"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Routes>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);

