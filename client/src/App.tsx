import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

/*
<Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:slug" element={<EndpointDetail />} />
      <Route path="/share/:token" element={<SharedRequest />} />
*/