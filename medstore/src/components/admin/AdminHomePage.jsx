import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HomePage.css'; // Make sure to create this CSS file or add styles in your global CSS
import "../../styles/LandingPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'; // Admin-specific icon

function AdminHomePage() {
  const [uniqueId, setUniqueId] = useState(null);

  useEffect(() => {
    const storedUniqueId = localStorage.getItem('uniqueId');
    if (storedUniqueId) {
      setUniqueId(storedUniqueId);
    } else {
      console.warn("Admin Unique ID not found in local storage.");
    }
  }, []);

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Swami Pharma Trader</div>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>

      <div className="admin-confirmation-section">
        <div className="admin-symbol-container">
          <FontAwesomeIcon icon={faShieldAlt} className="admin-symbol" />
        </div>
        <div className="admin-info">
          <h2>Admin Panel</h2>
          {uniqueId && <p>Admin Unique ID: <strong>{uniqueId}</strong></p>}
          {!uniqueId && <p>Admin Unique ID not available.</p>}
        </div>
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
            <Link to="/admin-order-management">
              <button>Manage Orders</button>
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

export default AdminHomePage;
