import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // Programmatic navigation example
    navigate('/');
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="coffee-icon">☕</div>
        <h1 className="error-code">404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you're looking for seems to have gone for a coffee break.</p>
        <p>It might have been moved, deleted, or never existed in the first place.</p>
        
        <div className="action-buttons">
          <button onClick={handleGoHome} className="primary-btn">
            Go Back Home
          </button>
          <button onClick={() => navigate(-1)} className="secondary-btn">
            Go Back
          </button>
        </div>

        <div className="suggestions">
          <h3>Quick Links:</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/order">Order Coffee</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

