import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import '../styles/AuthModel.css';
import '../styles/LoadSpinner.css';

function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // Add this line
  const [showUserRegister, setShowUserRegister] = useState(false);
  const [showAdminRegister, setShowAdminRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [branchId, setBranchId] = useState('');
  const[phoneNumber,setPhoneNumber]=useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoading(false), 2000);
    const popupTimer = setTimeout(() => setShowLogin(true), 2500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(popupTimer);
    };
  }, []);

  const handleUserRegisterClick = () => {
    setShowRegister(false); // Corrected line
    setShowUserRegister(true);
    setShowAdminRegister(false);
  };

  const handleAdminRegisterClick = () => {
    setShowRegister(false); // Corrected line
    setShowUserRegister(false);
    setShowAdminRegister(true);
  };

  return isLoading ? (
    <div className="loading-spinner"></div>
  ) : (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Swami Pharma Trader</div>

        {/* Hamburger Icon */}
        <button
          className="menu-toggle"
          onClick={() => {
            const menu = document.querySelector('.navbar-menu');
            menu.classList.toggle('active');
          }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Links that collapse */}
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><button onClick={() => setShowLogin(true)}>Login</button></li>
          <li>
            <button onClick={() => setShowRegister(true)}>Register</button> {/* Corrected line */}
          </li>
        </ul>
      </nav>

      {/* Banner */}
      <div className="banner">
        <img src="/assets/banner.png" alt="Medical Store Banner" />
        <div className="banner-text">
          <h1>Welcome to Swami Pharma Trader</h1>
          <p>Your Trusted Pharmacy Partner for Quality Medicines & Healthcare</p>
        </div>
      </div>

      {/* Features */}
      <div className="container">
        <div className="features">{/* Existing feature cards */}</div>
      </div>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              Swami Pharma is a leading provider of high-quality pharmaceutical solutions, committed to ensuring
              community well-being through innovation, reliability, and trust. We offer a wide range of medicines,
              efficient inventory systems, and customer-focused healthcare services to meet your pharmacy needs.
            </p>
            <p>
              Our mission is to ensure access to essential healthcare products, with timely support and data-driven
              tools that help pharmacies thrive.
            </p>
          </div>
          <div className="about-image">
            <img src="/assets/aboutus.png" alt="About Swami Pharma" />
          </div>
        </div>
      </section>

      {/* Partners Carousel */}
      <section className="carousel-section">
        <h2>Our Trusted Medicine Partners</h2>
        <div className="carousel">
          <div className="carousel-track">
            <img src="/assets/cipla.png" alt="Partner 1" />
            <img src="/assets/drreddy.png" alt="Partner 2" />
            <img src="/assets/sunpharma.png" alt="Partner 3" />
            <img src="/assets/Zydus_Logo.jpg" alt="Partner 4" />
            <img src="/assets/mankind.png" alt="Partner 1" />
            <img src="/assets/Biocon_Logo.svg.png" alt="Partner 2" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Contact Us</h4>
            <p>Email: contact@swamipharmatrader.com</p>
            <p>Phone: +91-9876543210</p>
            <p>Address: MIDC, Shiroli, Maharashtra 416122</p>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
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
          </div>
          <div className="map-link">
            <a href="https://maps.app.goo.gl/ecBrb9yQPAsvWFnh8" target="_blank" rel="noopener noreferrer">
              <button>View Our Location</button>
            </a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowLogin(false)}>
              ×
            </span>
            <h2>Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Optional: Add actual validation or fetch login logic here
                if (phoneNumber && password) {
                  navigate('/home'); // Redirect to Home page after login
                } else {
                  alert('Please enter valid credentials.');
                }
              }}
            >
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  required
                />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            <p>
              Don't have an account?{' '}
              <span
                className="link"
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(true); // Corrected line
                }}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Choose Registration Type Modal */}
      {showRegister && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowRegister(false)}>
              ×
            </span>
            <h2>Register As</h2>
            <div className="registration-options">
              <button onClick={handleUserRegisterClick}>User Registration</button>
              <button onClick={handleAdminRegisterClick}>Admin Registration</button>
            </div>
            <p>
              Already have an account?{' '}
              <span
                className="link"
                onClick={() => {
                  setShowRegister(false); // Corrected line
                  setShowLogin(true);
                }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      )}

      {/* User Register Modal */}
      {showUserRegister && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUserRegister(false)}>
              ×
            </span>
            <h2>User Registration</h2>
            <form className="register-form">
              <div className="form-row">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
              </div>
              <div className="form-row">
                <input type="text" placeholder="Mobile Number" required />
                <input type="text" placeholder="Shop Registration ID" required />
              </div>
              <div className="form-row">
                <input type="text" placeholder="Branch ID" required />
                <input type="password" placeholder="Password" required />
              </div>
              <div className="form-row full-width">
                <input type="text" placeholder="Location / Address" required />
              </div>
              <button type="submit">Register</button>
            </form>
            <p>
              Already have an account?{' '}
              <span
                className="link"
                onClick={() => {
                  setShowUserRegister(false);
                  setShowLogin(true);
                }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Admin Register Modal */}
      {showAdminRegister && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAdminRegister(false)}>
              ×
            </span>
            <h2>Admin Registration</h2>
            <form className="register-form">
              <div className="form-row">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
              </div>
              <div className="form-row">
                <input type="text" placeholder="Mobile Number" required />
                <input type="text" placeholder="Unique Admin ID" required />
              </div>
              <div className="form-row">
                <input type="password" placeholder="Password" required />
                <select defaultValue="" required>
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="superadmin">Super Admin</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit">Register</button>
            </form>
            <p>
              Already have an account?{' '}
              <span
                className="link"
                onClick={() => {
                  setShowAdminRegister(false);
                  setShowLogin(true);
                }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;