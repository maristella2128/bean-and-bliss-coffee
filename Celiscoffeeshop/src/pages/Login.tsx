import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import './Login.css';

const Login = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
      const htmlSection = section as HTMLElement;
      htmlSection.style.opacity = '0';
      htmlSection.style.transform = 'translateY(30px)';
      htmlSection.style.transition = 'all 0.6s ease';
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isRegisterMode) {
        // Registration Logic
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match!');
          setIsSubmitting(false);
          return;
        }

        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters long.');
          setIsSubmitting(false);
          return;
        }

        // Store user data
        const userData = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          registrationDate: new Date().toISOString()
        };

        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const userExists = existingUsers.find((u: any) => u.email === userData.email);

        if (userExists) {
          setError('An account with this email already exists.');
          setIsSubmitting(false);
          return;
        }

        existingUsers.push(userData);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

        // Auto-login after registration
        const userSession = {
          email: userData.email,
          name: userData.name,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(userSession));

        setShowSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);

      } else {
        // Login Logic
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = users.find((u: any) => 
          u.email === formData.email && u.password === formData.password
        );

        if (user) {
          const userSession = {
            email: user.email,
            name: user.name,
            loginTime: new Date().toISOString()
          };
          localStorage.setItem('user', JSON.stringify(userSession));
          navigate('/dashboard');
        } else {
          setError('Invalid email or password. Please try again.');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: ''
    });
  };

  return (
    <>
      <Loading />
      <Header />
      <section id="login">
        <h2 className="section-title">{isRegisterMode ? 'Create Account' : 'Welcome Back!'}</h2>
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <div className="login-icon">☕</div>
              <h3>{isRegisterMode ? 'Register Your Account' : 'Login to Your Account'}</h3>
              <p>{isRegisterMode ? 'Join us and enjoy exclusive benefits' : 'Enter your credentials to access your dashboard'}</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {error && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}

              {showSuccess && (
                <div className="success-message-inline">
                  <i className="fas fa-check-circle"></i>
                  <span>Account created successfully! Redirecting...</span>
                </div>
              )}

              {/* Register-only fields */}
              {isRegisterMode && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        First Name <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <i className="fas fa-user input-icon"></i>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          placeholder="John"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        Last Name <span className="required">*</span>
                      </label>
                      <div className="input-wrapper">
                        <i className="fas fa-user input-icon"></i>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <i className="fas fa-envelope input-icon"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              {isRegisterMode && (
                <div className="form-group">
                  <label htmlFor="phone">
                    Phone Number <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <i className="fas fa-phone input-icon"></i>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="password">
                  Password <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <i className="fas fa-lock input-icon"></i>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={isRegisterMode ? 8 : undefined}
                    placeholder={isRegisterMode ? "Min. 8 characters" : "Enter your password"}
                    autoComplete={isRegisterMode ? "new-password" : "current-password"}
                  />
                </div>
              </div>

              {isRegisterMode && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    Confirm Password <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <i className="fas fa-lock input-icon"></i>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="Re-enter password"
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              )}

              {!isRegisterMode && (
                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>
              )}

              <button
                type="submit"
                className={`login-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span>{isRegisterMode ? 'Creating Account...' : 'Logging in...'}</span>
                    <div className="spinner"></div>
                  </>
                ) : (
                  <>
                    <span>{isRegisterMode ? 'Create Account' : 'Login'}</span>
                    <i className="fas fa-arrow-right"></i>
                  </>
                )}
              </button>

              <div className="divider">
                <span>or</span>
              </div>

              <div className="social-login">
                <button type="button" className="social-btn google">
                  <i className="fab fa-google"></i>
                  Continue with Google
                </button>
                <button type="button" className="social-btn facebook">
                  <i className="fab fa-facebook"></i>
                  Continue with Facebook
                </button>
              </div>

              <div className="signup-prompt">
                {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}
                <button type="button" onClick={toggleMode} className="toggle-mode-btn">
                  {isRegisterMode ? ' Sign in here' : ' Sign up here'}
                </button>
              </div>
            </form>
          </div>

          <div className="login-features">
            <h3>Why Login?</h3>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">🎁</div>
                <div className="feature-content">
                  <h4>Exclusive Offers</h4>
                  <p>Access member-only discounts and promotions</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⭐</div>
                <div className="feature-content">
                  <h4>Loyalty Rewards</h4>
                  <p>Earn points with every purchase</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📦</div>
                <div className="feature-content">
                  <h4>Order History</h4>
                  <p>Track and reorder your favorites easily</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <div className="feature-content">
                  <h4>Quick Checkout</h4>
                  <p>Save time with saved addresses and cards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;

