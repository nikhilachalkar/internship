// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
//import '@fortawesome/fontawesome-free/css/all.min.css';




function LandingPage() {
  return (  
  <div>
    {/* Navbar */}
    <nav className="navbar">
      <div className="logo">Swami Pharma</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </nav>

    {/* Banner Section with Text Overlay */}
    <div className="banner">
      <img src="/assets/banner.jpg" alt="Medical Store Banner" />
      <div className="banner-text">
        <h1>Welcome to Swami Pharma Store</h1>
        <p>Your Trusted Pharmacy Partner for Quality Medicines & Healthcare</p>
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
          <Link to="/order-management">
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
        <div className="feature">
          <img src="assets/report.png" alt="Report Generation" />
          <h3>Report Generation</h3>
          <p>Generate detailed reports on sales, inventory, and financial performance.</p>
          <Link to="/report-generation">
            <button>Generate Reports</button>
          </Link>
        </div>
      </div>
    </div>

    {/* Footer Section */}
    <footer className="footer">
      <div className="footer-content">
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="map-link">
          <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
            <button>View Our Location</button>
          </a>
        </div>
      </div>
    </footer>
  </div>
  );
}

export default LandingPage;
