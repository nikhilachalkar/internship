import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate

import '../../styles/HomePage.css';
import "../../styles/LandingPage.css";
import "../../styles/OrderManagement.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart,faTrash } from '@fortawesome/free-solid-svg-icons';


function AdminMedicineTable() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('/api/getalldata', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  const handleSelectMedicine = (medicine) => {
    const isSelected = selectedMedicines.some((item) => item._id === medicine._id);
    if (!isSelected) {
      setSelectedMedicines([...selectedMedicines, { ...medicine, quantity: 1 }]);
    } else {
      setSelectedMedicines(selectedMedicines.filter((item) => item._id !== medicine._id));
    }
  };

  const handleQuantityChange = (event, medicineId) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setSelectedMedicines(
        selectedMedicines.map((item) =>
          item._id === medicineId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else if (event.target.value === '') {
      setSelectedMedicines(
        selectedMedicines.map((item) =>
          item._id === medicineId ? { ...item, quantity: '' } : item
        )
      );
    }
  };

  const handleRemoveSelectedMedicine = (medicineId) => {
    setSelectedMedicines(selectedMedicines.filter((item) => item._id !== medicineId));
  };
//add-to-cart
  const navigate = useNavigate(); 

  const handleAddToCart = () => {
    console.log('Adding to cart:', selectedMedicines);
   // Here, you would typically:
    // 1. Update your global cart state with selectedMedicines.
    // 2. Potentially send the cart data to the backend for order creation/billing preparation.

    // Navigate to the payment page and pass the selected medicines as state
    navigate('/payment', { state: { selectedMedicines } });
  };

  const isAddToCartEnabled = selectedMedicines.length > 0 && selectedMedicines.every(item => item.quantity > 0);

  if (loading) return <p>Loading medicines...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
   
    <div className="medicine-table-container">
          {/* Navbar */}
          <nav className="navbar">
      <div className="logo">OrderMangement</div>
    
      <ul className="navbar-menu">
        <li><Link to="/home">Back</Link></li>
      </ul>
    </nav>
      <h2>Medicine List</h2>
      <div className="search-bar-container">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search medicine name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {filteredMedicines.length === 0 && searchTerm ? (
        <p>No medicines found matching "{searchTerm}".</p>
      ) : filteredMedicines.length === 0 && !searchTerm ? (
        <p>No medicines available.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Price (₹)</th>
                <th>Discontinued</th>
                <th>Manufacturer</th>
                <th>Type</th>
                <th>Pack Size</th>
                <th>Composition 1</th>
                <th>Composition 2</th>
                <th>Stock Left</th>
                <th>Effect Group</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine._id || medicine.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedMedicines.some((item) => item._id === medicine._id)}
                      onChange={() => handleSelectMedicine(medicine)}
                    />
                  </td>
                  <td data-label="Name">{medicine.name}</td>
                  <td data-label="Price">₹{medicine.price}</td>
                  <td data-label="Discontinued">{medicine.Is_discontinued ? 'Yes' : 'No'}</td>
                  <td data-label="Manufacturer">{medicine.manufacturer_name}</td>
                  <td data-label="Type">{medicine.type}</td>
                  <td data-label="Pack Size">{medicine.pack_size_label}</td>
                  <td data-label="Composition 1">{medicine.short_composition1}</td>
                  <td data-label="Composition 2">{medicine.short_composition2}</td>
                  <td data-label="Stock Left">{medicine.stock_left}</td>
                  <td data-label="Effect Group">{medicine.effect_group}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedMedicines.length > 0 && (
        <div className="selected-medicines">
          <h3>
           Selected Items
          </h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price (₹)</th>
                <th>Action</th> {/* New column for delete */}
              </tr>
            </thead>
            <tbody>
              {selectedMedicines.map((selectedMedicine) => (
                <tr key={selectedMedicine._id}>
                  <td>{selectedMedicine.name}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={selectedMedicine.quantity}
                      onChange={(event) => handleQuantityChange(event, selectedMedicine._id)}
                    />
                  </td>
                  <td>₹{selectedMedicine.price * (selectedMedicine.quantity || 0)}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleRemoveSelectedMedicine(selectedMedicine._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> {/* Trash icon */}
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

<div className="add-to-cart-button-container">
  <button
    onClick={handleAddToCart}
    disabled={!isAddToCartEnabled}
    className="add-to-cart-button"
  >
    Add to Cart             <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />

  </button>
</div>
    </div>
  );
}

export default AdminMedicineTable;