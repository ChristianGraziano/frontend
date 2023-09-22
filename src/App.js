import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ErrorPage from "./Pages/ErrorPage";
import Login from "./Pages/Login";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import DashBoard from "./Pages/DashBoard";
import PostDetails from "./Pages/PostDetails";
import ProfileAssociation from "./Pages/ProfileAssociation";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<Homepage />} />
        <Route path="/postDetails/:id" element={<PostDetails />} />
        <Route
          path="/profileAssociation/:associationId"
          element={<ProfileAssociation />}
        />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
