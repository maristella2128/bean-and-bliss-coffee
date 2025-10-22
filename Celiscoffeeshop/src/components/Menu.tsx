import './Menu.css';

const Menu = () => {
  const menuItems = [
    {
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Classic Espresso",
      description: "Rich, intense, and perfectly balanced - the heart of Italian coffee culture",
      price: "₱150"
    },
    {
      image: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Velvet Cappuccino",
      description: "Espresso, steamed milk, and silky foam in perfect harmony",
      price: "₱200"
    },
    {
      image: "https://www.artisancoffeeschool.co.uk/wp-content/uploads/2023/10/ACS_Classes_1x1_LatteArtMC-600x600.jpg",
      title: "Artisan Latte",
      description: "Smooth espresso with creamy steamed milk and latte art",
      price: "₱220"
    },
    {
      image: "https://thegreencreator.com/wp-content/uploads/Refreshing-Cold-Brew-Tonic-with-cold-brew-coffee-tonic-water-and-citrus-TheGreenCreator-1.jpg",
      title: "Cold Brew Reserve",
      description: "24-hour steeped, smooth and naturally sweet cold coffee",
      price: "₱180"
    },
    {
      image: "https://hoxtoncoffee.com/cdn/shop/articles/latte-art-on-mocha_1080x.jpg?v=1660069726",
      title: "Signature Mocha",
      description: "Rich espresso, premium chocolate, and steamed milk",
      price: "₱240"
    },
    {
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Pour Over Special",
      description: "Single-origin beans, hand-crafted to perfection",
      price: "₱250"
    }
  ];

  return (
    <section id="menu">
      <h2 className="section-title">Our Signature Brews</h2>
      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <div className="menu-item" key={index}>
            <img src={item.image} alt={item.title} />
            <div className="menu-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="price">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;

