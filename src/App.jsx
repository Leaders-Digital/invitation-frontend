import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./Form";
import User from "./User";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
