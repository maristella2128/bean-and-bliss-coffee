import { useState, useEffect, FormEvent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import './OrderForm.css';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    'order-name': '',
    'order-email': '',
    'order-phone': '',
    'order-time': '',
    'coffee-selection': '',
    'quantity': '1',
    'size': 'medium',
    'milk-option': 'whole',
    'special-instructions': ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Send to PHP backend API
      const response = await fetch('http://localhost/coffeeshopcelis/api/orderform.php', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        setFormData({
          'order-name': '',
          'order-email': '',
          'order-phone': '',
          'order-time': '',
          'coffee-selection': '',
          'quantity': '1',
          'size': 'medium',
          'milk-option': 'whole',
          'special-instructions': ''
        });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Loading />
      <Header />
      <section id="order">
        <h2 className="section-title">Place Your Order</h2>
        <div className="order-section">
          <form className="order-form" id="orderForm" onSubmit={handleSubmit}>
            <h3>Order Your Coffee</h3>
            <p>Select your favorite coffee and we'll prepare it fresh for you!</p>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="order-name">Your Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="order-name"
                  name="order-name"
                  value={formData['order-name']}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="order-email">Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  id="order-email"
                  name="order-email"
                  value={formData['order-email']}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="order-phone">Phone Number <span className="required">*</span></label>
                <input
                  type="tel"
                  id="order-phone"
                  name="order-phone"
                  value={formData['order-phone']}
                  onChange={handleInputChange}
                  required
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="form-group">
                <label htmlFor="order-time">Pickup Time <span className="required">*</span></label>
                <input
                  type="time"
                  id="order-time"
                  name="order-time"
                  value={formData['order-time']}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="coffee-selection">Select Coffee <span className="required">*</span></label>
              <select
                id="coffee-selection"
                name="coffee-selection"
                value={formData['coffee-selection']}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose your coffee</option>
                <option value="espresso">Classic Espresso - ₱150</option>
                <option value="cappuccino">Velvet Cappuccino - ₱200</option>
                <option value="latte">Artisan Latte - ₱220</option>
                <option value="cold-brew">Cold Brew Reserve - ₱180</option>
                <option value="mocha">Signature Mocha - ₱240</option>
                <option value="pour-over">Pour Over Special - ₱250</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quantity">Quantity <span className="required">*</span></label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="10"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="size">Size</label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                >
                  <option value="small">Small (12oz)</option>
                  <option value="medium">Medium (16oz)</option>
                  <option value="large">Large (20oz)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="milk-option">Milk Preference</label>
              <select
                id="milk-option"
                name="milk-option"
                value={formData['milk-option']}
                onChange={handleInputChange}
              >
                <option value="whole">Whole Milk</option>
                <option value="skim">Skim Milk</option>
                <option value="almond">Almond Milk</option>
                <option value="oat">Oat Milk</option>
                <option value="soy">Soy Milk</option>
                <option value="none">No Milk</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="special-instructions">Special Instructions</label>
              <textarea
                id="special-instructions"
                name="special-instructions"
                rows={3}
                value={formData['special-instructions']}
                onChange={handleInputChange}
                placeholder="Any special requests or modifications..."
              ></textarea>
            </div>

            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
              id="submitOrderBtn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
            {showSuccess && (
              <div className="success-message" id="orderSuccessMessage">
                <i className="fas fa-check-circle"></i>
                <h3>Order Placed Successfully!</h3>
                <p>Your coffee will be ready soon. We'll send a confirmation to your email.</p>
              </div>
            )}
          </form>

          <div className="order-info">
            <h3>Order Information</h3>
            <p>Quick, easy, and delicious coffee delivered to you</p>
            <div className="info-item">
              <i className="fas fa-truck"></i>
              <span>Free pickup available</span>
            </div>
            <div className="info-item">
              <i className="fas fa-clock"></i>
              <span>Orders ready in 15-20 minutes</span>
            </div>
            <div className="info-item">
              <i className="fas fa-credit-card"></i>
              <span>Pay when you pickup</span>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <span>Call for delivery options: (555) 123-BEAN</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OrderForm;
