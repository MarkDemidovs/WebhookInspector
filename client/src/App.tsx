import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

/*
      <Route path="/dashboard/:slug" element={<EndpointDetail />} />
      <Route path="/share/:token" element={<SharedRequest />} />
*/
