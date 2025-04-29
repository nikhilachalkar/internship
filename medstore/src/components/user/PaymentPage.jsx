// PaymentPage.js
import React, { useState } from 'react';
import '../../styles/PaymentPage.css';

import { useLocation ,Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMobileAlt, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';

function PaymentPage() {
  const location = useLocation();
  const { selectedMedicines } = location.state || { selectedMedicines: [] };
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

  const totalAmount = selectedMedicines.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ).toFixed(2);

  const handlePaymentOptionClick = (option) => {
    setSelectedPaymentOption(option);
  };

  const renderPaymentDetails = () => {
    switch (selectedPaymentOption) {
      case 'upi':
        return (
          <div className="payment-option-details">
            <p>Pay securely using your UPI ID.</p>
            <form>
              <div>
                <label htmlFor="upiId">UPI ID:</label>
                <input type="text" id="upiId" placeholder="yourname@vpa" />
              </div>
              <button type="button">Pay Now</button>
            </form>
          </div>
        );
      case 'online':
        return (
          <div className="payment-option-details">
            <p>Enter your credit card details.</p>
            <form>
              <div>
                <label htmlFor="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" placeholder="****-****-****-****" />
              </div>
              <div>
                <label htmlFor="expiryDate">Expiry Date:</label>
                <input type="text" id="expiryDate" placeholder="MM/YY" />
              </div>
              <div>
                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" placeholder="123" />
              </div>
              <button type="submit">Pay Now</button>
            </form>
          </div>
        );
      case 'cod':
        return (
          <div className="payment-option-details">
            <p>You have selected Cash on Delivery. Please have ₹{totalAmount} ready at the time of delivery.</p>
            <button type="button">Confirm Order (COD)</button>
          </div>
        );
      default:
        return <p>Select a payment option to proceed.</p>;
    }
  };

  return (
    <div className="payment-page">
              {/* Navbar */}
                  <nav className="navbar">
              
            
              <ul className="navbar-menu">
                <li><Link to="/home">Back</Link></li>
              </ul>
            </nav>
      <h2>Payment</h2>

      <div className="order-summary-container">
        <h4>Order Summary:</h4>
        {selectedMedicines.length > 0 ? (
          <ul>
            {selectedMedicines.map((item) => (
              <li key={item._id}>
                {item.name} x {item.quantity} <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in your order.</p>
        )}
        <p className="total-amount">Total: ₹{totalAmount}</p>
      </div>

      <div className="payment-options-container">
        <h3>Payment Options</h3>
        <div
          className={`payment-option ${selectedPaymentOption === 'upi' ? 'selected' : ''}`}
          onClick={() => handlePaymentOptionClick('upi')}
        >
          <div className="payment-option-header">
            <FontAwesomeIcon icon={faMobileAlt} className="icon" />
            UPI Payment
          </div>
          {selectedPaymentOption === 'upi' && renderPaymentDetails()}
        </div>

        <div
          className={`payment-option ${selectedPaymentOption === 'online' ? 'selected' : ''}`}
          onClick={() => handlePaymentOptionClick('online')}
        >
          <div className="payment-option-header">
            <FontAwesomeIcon icon={faCreditCard} className="icon" />
            Credit/Debit Card
          </div>
          {selectedPaymentOption === 'online' && renderPaymentDetails()}
        </div>

        <div
          className={`payment-option ${selectedPaymentOption === 'cod' ? 'selected' : ''}`}
          onClick={() => handlePaymentOptionClick('cod')}
        >
          <div className="payment-option-header">
            <FontAwesomeIcon icon={faMoneyBillAlt} className="icon" />
            Cash on Delivery
          </div>
          {selectedPaymentOption === 'cod' && renderPaymentDetails()}
        </div>
      </div>

      {selectedPaymentOption && selectedPaymentOption !== 'cod' && (
        <button className="pay-now-button">Pay ₹{totalAmount} Now</button>
      )}
      {selectedPaymentOption === 'cod' && (
        <button className="pay-now-button">Confirm Cash on Delivery Order</button>
      )}
    </div>
  );
}

export default PaymentPage;