import './ContactSection.css';

const ContactSection = () => {
  return (
    <section id="contact">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-section">
        <div className="contact-info-card">
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <h3>Visit Us</h3>
              <p>123 Coffee Street, Brewville, CA 90210</p>
            </div>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <div>
              <h3>Call Us</h3>
              <p>(555) 123-BEAN</p>
            </div>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <div>
              <h3>Email Us</h3>
              <p>hello@beanandbliss.com</p>
            </div>
          </div>
          <div className="contact-item">
            <i className="fas fa-clock"></i>
            <div>
              <h3>Opening Hours</h3>
              <p>Mon-Fri: 6AM-8PM</p>
              <p>Sat-Sun: 7AM-9PM</p>
            </div>
          </div>
        </div>

        <div className="map-placeholder">
          <i className="fas fa-map-marked-alt"></i>
          <h3>Find Us Here</h3>
          <p>We're located in the heart of Brewville</p>
          <a href="/contact" className="contact-btn">
            Send Us a Message
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

