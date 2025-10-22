import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      text: "The best coffee I've ever had! The atmosphere is cozy and the staff is incredibly friendly. I come here every morning for my daily dose of happiness.",
      author: "Sarah M."
    },
    {
      text: "Their cold brew is absolutely phenomenal. Smooth, rich, and perfectly balanced. This place has become my go-to spot for work and coffee.",
      author: "Michael R."
    },
    {
      text: "The attention to detail in every cup is remarkable. You can taste the passion and expertise in every sip. Highly recommend the signature mocha!",
      author: "Emily K."
    }
  ];

  return (
    <section id="testimonials">
      <h2 className="section-title">What Our Customers Say</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-author">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

