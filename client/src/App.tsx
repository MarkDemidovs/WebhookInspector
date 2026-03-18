import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import EndpointDetail from "./pages/EndpointDetail";
import SharedRequest from "./pages/SharedRequest";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:id" element={<EndpointDetail />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/share/:token" element={<SharedRequest />} />
    </Routes>
  );
}

