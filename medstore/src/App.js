import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import OrderManagement from './components/user/OrderManagement';
import PaymentPage from './components/user/PaymentPage';
import StockManagement from './components/admin/AdminStockManagement';
function App() {
  useEffect(() => {
    // Load Botpress Webchat script
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v2.3/inject.js';
    script.async = true;

    script.onload = () => {
      // Load the Botpress configuration
      const configScript = document.createElement('script');
      configScript.src = 'https://files.bpcontent.cloud/2025/04/17/06/20250417065927-XGXMDZ5X.js';
      configScript.async = true;
      document.body.appendChild(configScript);
    };

    document.body.appendChild(script);
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />

          <Route path='/stock-management'element={<StockManagement/>}/>
          <Route path="/order-management" element={<OrderManagement />} />
          <Route path="payment" element={<PaymentPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
