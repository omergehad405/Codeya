import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HeroPage from './pages/HomePage/HeroPage'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/projects" element={<div>Projects Page</div>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App