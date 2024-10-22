import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./Form";
import User from "./User";
import Hello from "./Hello";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/hello" element={<Hello />} />
      </Routes>
    </Router>
  );
};

export default App;
