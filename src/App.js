import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ErrorPage from "./Pages/ErrorPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
