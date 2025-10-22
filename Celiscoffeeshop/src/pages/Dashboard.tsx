import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Guest';

  const handleLogout = () => {
    // Programmatic navigation example
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    navigate('/register');
  };

  const handlePlaceOrder = () => {
    // Programmatic navigation to order page
    navigate('/order');
  };

  return (
    <>
      <Loading />
      <Header />
      <main style={{ minHeight: '70vh', padding: '120px 20px 50px' }}>
        <section id="dashboard">
          <h2 className="section-title">Welcome, {userName}!</h2>
          <div className="dashboard-container">
            <div className="dashboard-card">
              <i className="fas fa-coffee dashboard-icon"></i>
              <h3>Quick Order</h3>
              <p>Place your favorite coffee order</p>
              <button onClick={handlePlaceOrder} className="dashboard-btn">
                Order Now
              </button>
            </div>

            <div className="dashboard-card">
              <i className="fas fa-history dashboard-icon"></i>
              <h3>Order History</h3>
              <p>View your past orders</p>
              <button className="dashboard-btn" disabled>
                Coming Soon
              </button>
            </div>

            <div className="dashboard-card">
              <i className="fas fa-star dashboard-icon"></i>
              <h3>Loyalty Points</h3>
              <p>Track your rewards</p>
              <button className="dashboard-btn" disabled>
                Coming Soon
              </button>
            </div>

            <div className="dashboard-card">
              <i className="fas fa-user dashboard-icon"></i>
              <h3>Profile Settings</h3>
              <p>Update your information</p>
              <button className="dashboard-btn" disabled>
                Coming Soon
              </button>
            </div>
          </div>

          <div className="logout-section">
            <button onClick={handleLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;

