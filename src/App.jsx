import { Routes, Route } from 'react-router-dom'
import CategoryPage from "./pages/CategoryPage";

// inside your <Routes>:
<Route path="/scholarships/:slug" element={<CategoryPage />} />
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
import ContactPage from './pages/ContactPage'
import ScholarshipDashboard from './pages/ScholarshipDashboard'

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
      {/* Navbar shows on every page EXCEPT contact and dashboard (they have their own) */}
      <Routes>
        {/* Pages that use the shared Navbar + Footer */}
        <Route path="/" element={
          <>
            <Navbar />
            <HomePage />
            <Footer />
          </>
        } />

        <Route path="/scholarships/:category" element={
          <>
            <Navbar />
            <ScholarshipPage />
            <Footer />
          </>
        } />

        <Route path="/admin" element={
          <>
            <Navbar />
            <Admin />
            <Footer />
          </>
        } />

        {/* Contact page — has its own internal Navbar and Footer */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Scholarship Dashboard — has its own internal Navbar, no Footer needed */}
        <Route path="/dashboard" element={<ScholarshipDashboard />} />
      </Routes>
    </>
  )
}

export default App
