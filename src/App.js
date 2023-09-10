import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ErrorPage from "./Pages/ErrorPage";
import Login from "./Pages/Login";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import DashBoard from "./Pages/DashBoard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}></Route>
        <Route path="/dashboard" element={<DashBoard />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
