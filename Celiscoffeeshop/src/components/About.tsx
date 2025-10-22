import './About.css';

const About = () => {
  return (
    <section id="about">
      <h2 className="section-title">Our Story</h2>
      <div className="about-section">
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Coffee Shop Interior" 
          />
        </div>
        <div className="about-content">
          <h3>Born from Passion</h3>
          <p>
            Bean & Bliss was founded in 2020 by coffee enthusiasts who believed that every cup 
            should tell a story. We source our beans from sustainable farms across the globe, 
            ensuring fair trade practices and exceptional quality.
          </p>
          <p>
            Our baristas are trained in the art of coffee making, from perfect espresso extraction 
            to intricate latte art. We believe coffee is more than a drink - it's an experience 
            that brings people together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

