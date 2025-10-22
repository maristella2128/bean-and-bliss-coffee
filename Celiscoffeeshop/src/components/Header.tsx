import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  // Check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUserName(userData.name || 'User');
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };

    checkLoginStatus();
    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Detect active section based on scroll position
      if (location.pathname === '/') {
        const sections = ['home', 'menu', 'offers', 'about', 'testimonials', 'gallery', 'contact'];
        const currentSection = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 150 && rect.bottom >= 150;
          }
          return false;
        });
        
        if (currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, sectionName: string) => {
    e.preventDefault();
    setMobileMenuOpen(false); // Close mobile menu when clicking a link
    setActiveSection(sectionName); // Set active section immediately
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false); // Close mobile menu when clicking regular links
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header style={{ 
      background: scrolled 
        ? 'rgba(139, 69, 19, 0.98)' 
        : 'rgba(139, 69, 19, 0.95)' 
    }}>
      <nav>
        <div className="logo">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Bean & Bliss</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          <li><a href="#home" onClick={(e) => handleSmoothScroll(e, '#home', 'home')} className={location.pathname === '/' && activeSection === 'home' ? 'active' : ''}>Home</a></li>
          <li><a href="#menu" onClick={(e) => handleSmoothScroll(e, '#menu', 'menu')} className={location.pathname === '/' && activeSection === 'menu' ? 'active' : ''}>Menu</a></li>
          <li><a href="#offers" onClick={(e) => handleSmoothScroll(e, '#offers', 'offers')} className={location.pathname === '/' && activeSection === 'offers' ? 'active' : ''}>Offers</a></li>
          <li><a href="#about" onClick={(e) => handleSmoothScroll(e, '#about', 'about')} className={location.pathname === '/' && activeSection === 'about' ? 'active' : ''}>About</a></li>
          <li><a href="#testimonials" onClick={(e) => handleSmoothScroll(e, '#testimonials', 'testimonials')} className={location.pathname === '/' && activeSection === 'testimonials' ? 'active' : ''}>Testimonials</a></li>
          <li><a href="#gallery" onClick={(e) => handleSmoothScroll(e, '#gallery', 'gallery')} className={location.pathname === '/' && activeSection === 'gallery' ? 'active' : ''}>Gallery</a></li>
          <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact', 'contact')} className={location.pathname === '/' && activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          <li><Link to="/order" onClick={handleLinkClick} className={location.pathname === '/order' ? 'active' : ''}>Order</Link></li>
          
          {isLoggedIn ? (
            <>
              <li><Link to="/dashboard" onClick={handleLinkClick} className={`user-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                <i className="fas fa-user-circle"></i> {userName}
              </Link></li>
              <li><button onClick={handleLogout} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={handleLinkClick} className={`login-link ${location.pathname === '/login' ? 'active' : ''}`}>
                <i className="fas fa-sign-in-alt"></i> Login
              </Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

