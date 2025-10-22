import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import Offers from '../components/Offers';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const Home = () => {
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

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      const htmlSection = section as HTMLElement;
      htmlSection.style.opacity = '0';
      htmlSection.style.transform = 'translateY(30px)';
      htmlSection.style.transition = 'all 0.6s ease';
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Loading />
      <Header />
      {/* Section 1: HOME - Hero Section */}
      <Hero />
      
      {/* Section 2: MENU - Coffee Menu */}
      <Menu />
      
      {/* Section 3: OFFERS - Special Offers */}
      <Offers />
      
      {/* Section 4: ABOUT - Company Story */}
      <About />
      
      {/* Section 5: TESTIMONIALS - Customer Reviews */}
      <Testimonials />
      
      {/* Section 6: GALLERY - Photo Gallery */}
      <Gallery />
      
      {/* Section 7: CONTACT - Contact Information (Bonus) */}
      <ContactSection />
      
      <Footer />
    </>
  );
};

export default Home;
