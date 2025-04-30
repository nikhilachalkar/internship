<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import '../styles/AuthModel.css';
import '../styles/LoadSpinner.css';

function LandingPage() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showUserRegister, setShowUserRegister] = useState(false);
    const [showAdminRegister, setShowAdminRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingInAsAdmin, setIsLoggingInAsAdmin] = useState(false); 

    useEffect(() => {
        const loadTimer = setTimeout(() => setIsLoading(false), 2000);
        const popupTimer = setTimeout(() => setShowLogin(true), 2500);

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(popupTimer);
        };
    }, []);

    const handleUserRegisterClick = () => {
        setShowRegister(false);
        setShowUserRegister(true);
        setShowAdminRegister(false);
    };

    const handleAdminRegisterClick = () => {
        setShowRegister(false);
        setShowUserRegister(false);
        setShowAdminRegister(true);
    };

    const handleUserRegistrationSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
        userData.role = 'user'; 

        try {
            const response = await fetch('/auth/register/user', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User registration successful:', result);
                alert('Registration successful! You can now log in.');
                setShowUserRegister(false);
                setShowLogin(true);
            } else {
                const errorResult = await response.json();
                console.error('User registration failed:', errorResult);
                alert(`Registration failed: ${errorResult.message || 'Something went wrong.'}`);
            }
        } catch (error) {
            console.error('Error during user registration:', error);
            alert('An unexpected error occurred during registration.');
        }
    };

    const handleAdminRegistrationSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const adminData = Object.fromEntries(formData.entries());
        adminData.role = 'admin'; 

        try {
            const response = await fetch('/auth/register/admin', { // Using your single register route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Admin registration successful:', result);
                alert('Admin registration successful!');
                setShowAdminRegister(false);
                setShowLogin(true);
            } else {
                const errorResult = await response.json();
                console.error('Admin registration failed:', errorResult);
                alert(`Admin registration failed: ${errorResult.message || 'Something went wrong.'}`);
            }
        } catch (error) {
            console.error('Error during admin registration:', error);
            alert('An unexpected error occurred during registration.');
        }
    };

    const handleLoginSubmit = async (e) => {
      e.preventDefault();
  
      // ... (phone number and password validation) ...
  
      const loginEndpoint = isLoggingInAsAdmin ? '/auth/login/admin' : '/auth/login/user';
  
      console.log('Attempting login to:', loginEndpoint);
  
      try {
          const response = await fetch(loginEndpoint, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ mob: phoneNumber, password }),
          });
  
          console.log('Login Response Status:', response.status);
  
          if (response.ok) {
              const data = await response.json();
              console.log('Login Successful, Data:', data);
              const userRole = data.role;
              const userBranchId = data.branchId;
                const adminUniqueId=data.uniqueID;

  
              if (userBranchId && !isLoggingInAsAdmin) {
                  localStorage.setItem('userBranchId', userBranchId);
              } else if (isLoggingInAsAdmin) {
                  localStorage.removeItem('userBranchId');
              } else {
                  console.warn("Branch ID not received for user login.");
              }
              if (adminUniqueId && isLoggingInAsAdmin) {
                localStorage.setItem('uniqueId', adminUniqueId);
            } else if (isLoggingInAsAdmin) {
                localStorage.removeItem('uniqueId'); // Consider if you want to remove it on admin logout
            }
         
              if (userRole === 'user') {
                  navigate('/user-home');
              } else if (userRole === 'admin') {
                  navigate('/admin-home');
              } else {
                  console.error('Unknown user role:', userRole);
                  alert('Login successful, but unable to determine homepage.');
                  navigate('/home');
              }
          } else {
              const errorData = await response.json();
              console.error('Login Failed, Status:', response.status, 'Data:', errorData);
              alert(errorData?.message || `Login failed with status: ${response.status}. Please check your credentials.`);
          }
      } catch (error) {
          console.error('Error during login fetch:', error);
          alert('An unexpected error occurred during login.');
      }
  };
    return isLoading ? (
        <div className="loading-spinner"></div>
    ) : (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">Swami Pharma Trader</div>
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
                <ul className="navbar-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><button onClick={() => setShowLogin(true)}>Login</button></li>
                    <li>
                        <button onClick={() => setShowRegister(true)}>Register</button>
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
                        <div>
                            <label>
                                Login as Admin:
                                <input
                                    type="checkbox"
                                    checked={isLoggingInAsAdmin}
                                    onChange={(e) => setIsLoggingInAsAdmin(e.target.checked)}
                                />
                            </label>
                        </div>
                        <form onSubmit={handleLoginSubmit}>
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
                                    setShowRegister(true);
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
                                    setShowRegister(false);
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
                        <form className="register-form" onSubmit={handleUserRegistrationSubmit}>
                            <div className="form-row">
                                <input type="text" placeholder="First Name" name="fname" required />
                                <input type="text" placeholder="Last Name" name="lname" required />
                            </div>
                            <div className="form-row">
                                <input type="text" placeholder="Mobile Number" name="mob" required />
                                <input type="text" placeholder="Shop Registration ID" name="shopid" required />
                            </div>
                            <div className="form-row">
                                <input type="text" placeholder="Branch ID" name="branch" required />
                                <input type="password" placeholder="Password" name="password" required />
                            </div>
                            <div className="form-row full-width">
                                <input type="text" placeholder="Location / Address" name="address" required />
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
                        <form className="register-form" onSubmit={handleAdminRegistrationSubmit}>
                            <div className="form-row">
                                <input type="text" placeholder="First Name" name="fname" required />
                                <input type="text" placeholder="Last Name" name="lname" required />
                            </div>
                            <div className="form-row">
                                <input type="text" placeholder="Mobile Number" name="mob" required />
                                <input type="text" placeholder="Unique Admin ID" name="UniqueID" required />
                            </div>
                            <div className="form-row">
                                <input type="password" placeholder="Password" name="password" required />
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

=======
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

>>>>>>> 0bd313d7444d79a691d5cd51c3ec13ea754827d0
export default LandingPage;