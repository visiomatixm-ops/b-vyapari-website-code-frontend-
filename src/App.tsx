import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import HowItWorksPage from './pages/HowItWorksPage'
import PricingPage from './pages/PricingPage'
import ReviewsPage from './pages/ReviewsPage'
import LoginPage from './pages/LoginPage'
import StartFreePage from './pages/StartFreePage'
import { useReveal } from './hooks/useReveal'
import './styles/global.css'
import './styles/sections.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    // Small delay so new page elements are in the DOM before we check visibility
    setTimeout(() => {
      document.querySelectorAll('.rv:not(.vis), .step-item:not(.vis)').forEach((el, i) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setTimeout(() => el.classList.add('vis'), i * 50)
        }
      })
    }, 50)
  }, [pathname])
  return null
}

export default function App() {
  useReveal()
  const location = useLocation()
  const showFooter = !['/login', '/start-free'].includes(location.pathname)

  return (
    <>
      <Cursor />
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/start-free" element={<StartFreePage />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  )
}
