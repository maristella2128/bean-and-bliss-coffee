import './Offers.css';

const Offers = () => {
  const offers = [
    {
      title: "Happy Hour",
      description: "Buy any coffee, get 50% off pastries",
      time: "2-5 PM Daily"
    },
    {
      title: "Loyalty Card",
      description: "Buy 9 drinks, get the 10th free",
      time: "Join our rewards program"
    },
    {
      title: "Weekend Special",
      description: "Free upgrade to large size",
      time: "Saturday & Sunday"
    }
  ];

  return (
    <section id="offers">
      <section className="offers-section">
        <h2 className="section-title">
          Today's Special Offers
        </h2>
        <div className="offers-grid">
          {offers.map((offer, index) => (
            <div className="offer-card" key={index}>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <small>{offer.time}</small>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Offers;

