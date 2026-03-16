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
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}