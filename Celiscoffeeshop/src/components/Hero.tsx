import { useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero') as HTMLElement;
      if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#menu');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Bean & Bliss</h1>
        <p className="hero-subtitle">Experience the perfect blend of tradition and innovation in every cup</p>
        <div className="hero-features">
          <span className="feature-badge">☕ Premium Coffee</span>
          <span className="feature-badge">🌿 Sustainable</span>
          <span className="feature-badge">✨ Handcrafted</span>
        </div>
        <a href="#menu" className="cta-button" onClick={handleExploreClick}>
          <span>Explore Our Menu</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;

