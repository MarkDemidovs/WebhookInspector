import { Routes, Route } from 'react-router-dom'

function Home() {
  return <h1 className="text-3xl font-bold text-blue-600">Home Page</h1>
}

function About() {
  return <h1 className="text-3xl font-bold text-green-600">About Page</h1>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:slug" element={<EndpointDetail />} />
      <Route path="/share/:token" element={<SharedRequest />} />
    </Routes>
  )
}