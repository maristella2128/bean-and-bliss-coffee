import { useState, useEffect, FormEvent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    'reg-first-name': '',
    'reg-last-name': '',
    'reg-email': '',
    'reg-password': '',
    'reg-confirm-password': '',
    'reg-phone': '',
    'newsletter': true,
    'terms': false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error message when user starts typing
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate passwords match
    if (formData['reg-password'] !== formData['reg-confirm-password']) {
      setErrorMessage('Passwords do not match! Please try again.');
      return;
    }

    // Validate password length
    if (formData['reg-password'].length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    // Validate terms accepted
    if (!formData.terms) {
      setErrorMessage('You must accept the Terms of Service and Privacy Policy.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('reg-first-name', formData['reg-first-name']);
      formDataToSend.append('reg-last-name', formData['reg-last-name']);
      formDataToSend.append('reg-email', formData['reg-email']);
      formDataToSend.append('reg-password', formData['reg-password']);
      formDataToSend.append('reg-confirm-password', formData['reg-confirm-password']);
      formDataToSend.append('reg-phone', formData['reg-phone']);
      if (formData.newsletter) formDataToSend.append('newsletter', '1');
      if (formData.terms) formDataToSend.append('terms', '1');

      // Send to PHP backend API
      const response = await fetch('http://localhost/coffeeshopcelis/api/registration.php', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        
        // Store user data in localStorage for login authentication
        const userData = {
          name: `${formData['reg-first-name']} ${formData['reg-last-name']}`,
          email: formData['reg-email'],
          password: formData['reg-password'], // In production, never store plain passwords
          phone: formData['reg-phone'],
          registrationDate: new Date().toISOString()
        };
        
        // Get existing users or create empty array
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        // Check if user already exists
        const userExists = existingUsers.find((u: any) => u.email === userData.email);
        
        if (!userExists) {
          // Add new user to array
          existingUsers.push(userData);
          localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
        }
        
        // Auto-login after registration
        const userSession = {
          email: userData.email,
          name: userData.name,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(userSession));
        
        setFormData({
          'reg-first-name': '',
          'reg-last-name': '',
          'reg-email': '',
          'reg-password': '',
          'reg-confirm-password': '',
          'reg-phone': '',
          'newsletter': true,
          'terms': false
        });
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          setShowSuccess(false);
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while creating your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Loading />
      <Header />
      <section id="register">
        <div className="registration-container">
          <div className="registration-card">
            <div className="registration-header">
              <div className="registration-icon">☕</div>
              <h3>Register Your Account</h3>
              <p>Join us and enjoy exclusive benefits</p>
            </div>

            <form className="registration-form" id="registrationForm" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reg-first-name">First Name <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <i className="fas fa-user input-icon"></i>
                    <input
                      type="text"
                      id="reg-first-name"
                      name="reg-first-name"
                      value={formData['reg-first-name']}
                      onChange={handleInputChange}
                      required
                      placeholder="John"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="reg-last-name">Last Name <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <i className="fas fa-user input-icon"></i>
                    <input
                      type="text"
                      id="reg-last-name"
                      name="reg-last-name"
                      value={formData['reg-last-name']}
                      onChange={handleInputChange}
                      required
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-email">Email Address <span className="required">*</span></label>
                <div className="input-wrapper">
                  <i className="fas fa-envelope input-icon"></i>
                  <input
                    type="email"
                    id="reg-email"
                    name="reg-email"
                    value={formData['reg-email']}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-phone">Phone Number <span className="required">*</span></label>
                <div className="input-wrapper">
                  <i className="fas fa-phone input-icon"></i>
                  <input
                    type="tel"
                    id="reg-phone"
                    name="reg-phone"
                    value={formData['reg-phone']}
                    onChange={handleInputChange}
                    required
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-password">Password <span className="required">*</span></label>
                <div className="input-wrapper">
                  <i className="fas fa-lock input-icon"></i>
                  <input
                    type="password"
                    id="reg-password"
                    name="reg-password"
                    value={formData['reg-password']}
                    onChange={handleInputChange}
                    required
                    placeholder="Min. 8 characters"
                    minLength={8}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-confirm-password">Confirm Password <span className="required">*</span></label>
                <div className="input-wrapper">
                  <i className="fas fa-lock input-icon"></i>
                  <input
                    type="password"
                    id="reg-confirm-password"
                    name="reg-confirm-password"
                    value={formData['reg-confirm-password']}
                    onChange={handleInputChange}
                    required
                    placeholder="Re-enter password"
                  />
                </div>
              </div>

              <button type="submit" className={`submit-btn ${isSubmitting ? 'loading' : ''}`} id="submitBtn" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
                <i className="fas fa-arrow-right"></i>
              </button>

              {errorMessage && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{errorMessage}</span>
                </div>
              )}

              {showSuccess && (
                <div className="success-message-inline">
                  <i className="fas fa-check-circle"></i>
                  <span>Account created successfully! Redirecting...</span>
                </div>
              )}

              <div className="divider-container">
                <div className="divider">
                  <span>OR</span>
                </div>
              </div>

              <div className="social-login">
                <button type="button" className="social-btn google-btn">
                  <i className="fab fa-google"></i>
                  <span>Continue with Google</span>
                </button>
                <button type="button" className="social-btn facebook-btn">
                  <i className="fab fa-facebook-f"></i>
                  <span>Continue with Facebook</span>
                </button>
              </div>

              <div className="signup-prompt">
                Already have an account? <button type="button" className="toggle-mode-btn" onClick={() => window.location.href = '/login'}>Sign in here</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Registration;
