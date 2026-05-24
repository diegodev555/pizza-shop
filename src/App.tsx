import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Header, Footer } from './components';
import { Home, Menu, About, Contact } from './pages';
import { AdminLayout } from './components/AdminLayout';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminMenuItems } from './pages/AdminMenuItems';
import { AdminCategories } from './pages/AdminCategories';
import { AdminPromotions } from './pages/AdminPromotions';
import { AdminTestimonials } from './pages/AdminTestimonials';
import { AdminShopInfo } from './pages/AdminShopInfo';
import { AdminHomeContent } from './pages/AdminHomeContent';
import { AdminAboutContent } from './pages/AdminAboutContent';
import { AdminContactMessages } from './pages/AdminContactMessages';

function AmbientBackground() {
  return (
    <div className="ambient-bg">
      <div className="ambient-blob" />
      <div className="ambient-blob" />
      <div className="ambient-blob" />
      <div className="ambient-blob" />
      <div className="ambient-blob" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AmbientBackground />
        <Routes>
          {/* Admin Login - no auth required */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin routes - protected by AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="menu-items" element={<AdminMenuItems />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="promotions" element={<AdminPromotions />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="shop-info" element={<AdminShopInfo />} />
            <Route path="home-content" element={<AdminHomeContent />} />
            <Route path="about-content" element={<AdminAboutContent />} />
            <Route path="contact-messages" element={<AdminContactMessages />} />
          </Route>

          {/* Public routes - no admin links visible */}
          <Route path="*" element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;