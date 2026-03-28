import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import HeroPage from './pages/HomePage/HeroPage'
import Footer from './components/Footer'
import Projects from './pages/ProjectsPage/Projects'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language || 'en'
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App