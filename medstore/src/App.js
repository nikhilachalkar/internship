// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
// import StockManagement from './components/StockManagement';
// import OrderManagement from './components/OrderManagement';
// import SalesMonitoring from './components/SalesMonitoring';
// import ReportGeneration from './components/ReportGeneration';

function App() {
  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<LandingPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
