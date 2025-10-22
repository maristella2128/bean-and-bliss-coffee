import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Bean & Bliss</h3>
          <p>Artisan coffee crafted with passion and precision. Join us for the perfect cup every day.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p>
            <a 
              href="#menu" 
              style={{ color: 'var(--text-light)', textDecoration: 'none' }}
              onClick={(e) => handleSmoothScroll(e, '#menu')}
            >
              Menu
            </a>
          </p>
          <p>
            <a 
              href="#about" 
              style={{ color: 'var(--text-light)', textDecoration: 'none' }}
              onClick={(e) => handleSmoothScroll(e, '#about')}
            >
              About
            </a>
          </p>
          <p>
            <Link to="/contact" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>
              Contact
            </Link>
          </p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <p style={{ marginTop: '2rem', opacity: 0.8 }}>
        &copy; 2025 Bean & Bliss Coffee. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

