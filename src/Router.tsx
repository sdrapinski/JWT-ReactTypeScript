import React from "react";

import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import AppProvider from "./AppContext";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <nav>
          <ul
            style={{
              display: "flex",
              gap: "20px",
              width: "90vw",
              listStyle: "none",
            }}
          >
            <li>
              <NavLink to="/">Home </NavLink>
            </li>
            <li>
              <NavLink to="/login">Login </NavLink>
            </li>
            <li>
              <NavLink to="/admin">Admin </NavLink>
            </li>
            <li>
              <NavLink to="/logout">Logout </NavLink>
            </li>
          </ul>
          <hr />
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
