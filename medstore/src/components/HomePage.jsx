import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Make sure to create this CSS file or add styles in your global CSS
import "../styles/LandingPage.css";
function HomePage() {
  return (
    <div className="dashboard">

      {/* Navbar */}
      <nav className="navbar">
  <div className="logo">Swami Pharma Trader</div>

  <ul className="navbar-menu">
    <li><Link to="/">Home</Link></li>
  </ul>
</nav>


      {/* User Panel Heading */}
      <div className="user-panel-heading">
        <img src="/assets/customer_icon.png" alt="Customer Icon" className="customer-icon" />
        <h2>User Panel</h2>
      </div>

      {/* Features Section */}
      <div className="container">
        <div className="features">
          <div className="feature">
            <img src="/assets/stock.jpeg" alt="Stock Management" />
            <h3>Stock Management</h3>
            <p>Efficiently manage inventory levels, track stock movements, and receive low-stock alerts.</p>
            <Link to="/stock-management">
              <button>Manage Stock</button>
            </Link>
          </div>
          <div className="feature">
            <img src="/assets/order.png" alt="Order Management" />
            <h3>Order Management</h3>
            <p>Streamline order processing, track deliveries, and manage supplier relationships.</p>
            <Link to="/order-management">
              <button  >Manage Orders</button>
            </Link>
          </div>
          <div className="feature">
            <img src="/assets/sales.jpg" alt="Sales Monitoring" />
            <h3>Sales Monitoring</h3>
            <p>Analyze sales data, identify trends, and optimize pricing strategies.</p>
            <Link to="/sales-monitoring">
              <button>Monitor Sales</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
