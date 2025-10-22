import { useState, useEffect, FormEvent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);

      // Send to PHP backend API
      const response = await fetch('http://localhost/coffeeshopcelis/api/contact.php', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Loading />
      <Header />
      <main>
        <section id="contact">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send us a Message</h3>
              <p>Have a question or feedback? We'd love to hear from you!</p>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {showSuccess && (
                <div className="success-message" id="contactSuccessMessage">
                  <i className="fas fa-check-circle"></i>
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for your message! We'll get back to you soon.</p>
                </div>
              )}
            </form>
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>Feel free to reach out to us through any of these channels</p>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Coffee Street, Brewville, CA 90210</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>(555) 123-BEAN</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>hello@beanandbliss.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>Mon-Fri: 6AM-8PM, Sat-Sun: 7AM-9PM</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;

