import { Routes, Route } from 'react-router-dom'

// Layout components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Home page sections
import Hero from './components/Hero'
import Stats from './components/Stats'
import Categories from './components/Categories'
import ScholarshipCards from './components/ScholarshipCards'
import CTA from './components/CTA'
import WhyChooseUs from './components/WhyChooseUs'

// Pages
import ScholarshipPage from './pages/ScholarshipPage'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'

/* ── Full home page made of all your existing sections ── */
function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <ScholarshipCards />
      <WhyChooseUs />
      <CTA />
    </>
  )
}

function App() {
  return (
    <>
      {/* Navbar shows on every page */}
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Scholarship detail pages e.g. /scholarships/national */}
        <Route path="/scholarships/:category" element={<ScholarshipPage />} />

        {/* Admin dashboard – protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Footer shows on every page */}
      <Footer />
    </>
  )
}

export default App
