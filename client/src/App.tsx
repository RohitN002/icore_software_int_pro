import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = "your-jwt-token";
  return (
    <BrowserRouter>
      {/* <h3 className="bg-red-400 text-2xl text-blue-500 text-center"> hello </h3> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
