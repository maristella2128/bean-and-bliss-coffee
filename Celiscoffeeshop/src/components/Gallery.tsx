import './Gallery.css';

const Gallery = () => {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Coffee Art"
    },
    {
      src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Cold Brew"
    },
    {
      src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Coffee Beans"
    }
  ];

  return (
    <section id="gallery">
      <h2 className="section-title">Coffee Moments</h2>
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <div className="gallery-item" key={index}>
            <img src={image.src} alt={image.alt} />
            <i className="fas fa-camera gallery-icon"></i>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

