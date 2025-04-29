import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEdit, faTrash, faSort, faFilter } from '@fortawesome/free-solid-svg-icons';
import '../../styles/StockManagement.css';
import '../../styles/AddMedicine.css';
function AdminStockManagement() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filters, setFilters] = useState({});

  // State for temporary editing
  const [editingMedicineId, setEditingMedicineId] = useState(null);
  const [editedMedicine, setEditedMedicine] = useState({});
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    price: '',
    Is_discontinued: false,
    manufacturer_name: '',
    type: '',
    pack_size_label: '',
    stock_left: '',
  });
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('/api/getalldata'); // Adjust API endpoint
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setMedicines(data);
      } catch (err) {
        console.error('Error fetching medicines:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value === 'all' ? undefined : value,
    }));
  };

  const filteredAndSortedMedicines = React.useMemo(() => {
    let filtered = medicines.filter(m =>
      m?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );

    filtered = Object.keys(filters).reduce((acc, key) => {
      const filterValue = filters[key];
      if (filterValue !== undefined) {
        return acc.filter(m =>
          String(m[key]).toLowerCase() === String(filterValue).toLowerCase()
        );
      }
      return acc;
    }, filtered);

    if (sortColumn) {
      filtered.sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [medicines, searchTerm, sortColumn, sortDirection, filters]);

  // --- DELETE FUNCTIONALITY ---
  const handleDeleteMedicine = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        const response = await fetch(`/api/medicines/${id}`, { // Adjust API endpoint
          method: 'DELETE',
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        // Update the local state by removing the deleted medicine
        setMedicines(medicines.filter(medicine => medicine._id !== id));
        alert('Medicine deleted successfully!');
      } catch (err) {
        console.error('Error deleting medicine:', err);
        alert('Failed to delete medicine.');
      }
    }
  };

  // --- EDIT FUNCTIONALITY ---
  const handleEditMedicine = (medicine) => {
    setEditingMedicineId(medicine._id);
    setEditedMedicine({ ...medicine });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedMedicine(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/medicines/${editingMedicineId}`, { // Adjust API endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMedicine),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const updatedMedicine = await response.json();
      setMedicines(medicines.map(m => (m._id === editingMedicineId ? updatedMedicine : m)));
      setEditingMedicineId(null);
      setEditedMedicine({});
      alert('Medicine updated successfully!');
    } catch (err) {
      console.error('Error updating medicine:', err);
      alert('Failed to update medicine.');
    }
  };


  const openAddForm = () => {
    setIsAddFormOpen(true);
  };

  const closeAddForm = () => {
    setIsAddFormOpen(false);
    setNewMedicine({
      name: '',
      price: '',
      Is_discontinued: false,
      manufacturer_name: '',
      type: '',
      pack_size_label: '',
      stock_left: '',
    });
  };

  const handleNewMedicineChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewMedicine(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddMedicineSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMedicine),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData?.message || 'Failed to add medicine'}`);
      }

      const savedMedicine = await response.json();
      setMedicines([...medicines, savedMedicine]);
      closeAddForm();
      alert('Medicine added successfully!');
    } catch (error) {
      console.error('Error adding medicine:', error);
      alert(`Failed to add medicine: ${error.message}`);
    }
  };

  if (loading) return <p>Loading stock information...</p>;
  if (error) return <p>Error: {error}</p>;



  const handleCancelEdit = () => {
    setEditingMedicineId(null);
    setEditedMedicine({});
  };

  if (loading) return <p>Loading stock information...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="stock-management-container">
      <nav className="navbar">
        <div className="logo">Medicine Stock Management</div>
        <ul className="navbar-menu">
          <li><Link to="/home">Back to Dashboard</Link></li>
          <li>
          <button onClick={openAddForm} className="add-button">
              <FontAwesomeIcon icon={faPlus} /> Add Medicine
            </button>
          </li>
        </ul>
      </nav>

      <h2>Medicine Stock</h2>
      

      <div className="controls-container">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search medicine name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="filters">
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          <label htmlFor="discontinued-filter">Discontinued:</label>
          <select name="Is_discontinued" id="discontinued-filter" onChange={handleFilterChange} defaultValue="all">
            <option value="all">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <label htmlFor="type-filter">Type:</label>
          <select name="type" id="type-filter" onChange={handleFilterChange} defaultValue="all">
            <option value="all">All</option>
            {[...new Set(medicines.map(m => m.type))].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {/* Add more filters as needed */}
        </div>
      </div>
      {isAddFormOpen && (
        <div className="add-medicine-form-overlay">
          <div className="add-medicine-form">
            <h2>Add New Medicine</h2>
            <form onSubmit={handleAddMedicineSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={newMedicine.name} onChange={handleNewMedicineChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (₹):</label>
                <input type="number" id="price" name="price" value={newMedicine.price} onChange={handleNewMedicineChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="Is_discontinued">Discontinued:</label>
                <input type="checkbox" id="Is_discontinued" name="Is_discontinued" checked={newMedicine.Is_discontinued} onChange={handleNewMedicineChange} />
              </div>
              <div className="form-group">
                <label htmlFor="manufacturer_name">Manufacturer:</label>
                <input type="text" id="manufacturer_name" name="manufacturer_name" value={newMedicine.manufacturer_name} onChange={handleNewMedicineChange} />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type:</label>
                <input type="text" id="type" name="type" value={newMedicine.type} onChange={handleNewMedicineChange} />
              </div>
              <div className="form-group">
                <label htmlFor="pack_size_label">Pack Size:</label>
                <input type="text" id="pack_size_label" name="pack_size_label" value={newMedicine.pack_size_label} onChange={handleNewMedicineChange} />
              </div>
              <div className="form-group">
                <label htmlFor="stock_left">Stock Left:</label>
                <input type="number" id="stock_left" name="stock_left" value={newMedicine.stock_left} onChange={handleNewMedicineChange} required />
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-button">Add</button>
                <button type="button" onClick={closeAddForm} className="cancel-button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

     

      {filteredAndSortedMedicines.length === 0 && searchTerm ? (
        <p>No medicines found matching "{searchTerm}".</p>
      ) : filteredAndSortedMedicines.length === 0 && Object.values(filters).some(f => f !== undefined) ? (
        <p>No medicines found matching the current filters.</p>
      ) : filteredAndSortedMedicines.length === 0 ? (
        <p>No medicines in stock.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>Name <FontAwesomeIcon icon={faSort} /></th>
                <th onClick={() => handleSort('price')}>Price (₹) <FontAwesomeIcon icon={faSort} /></th>
                <th onClick={() => handleSort('Is_discontinued')}>Discontinued <FontAwesomeIcon icon={faSort} /></th>
                <th onClick={() => handleSort('manufacturer_name')}>Manufacturer <FontAwesomeIcon icon={faSort} /></th>
                <th onClick={() => handleSort('type')}>Type <FontAwesomeIcon icon={faSort} /></th>
                <th onClick={() => handleSort('pack_size_label')}>Pack Size </th>
                <th onClick={() => handleSort('stock_left')}>Stock Left <FontAwesomeIcon icon={faSort} /></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedMedicines.map((medicine) => (
                <tr key={medicine._id || medicine.id} className={medicine.stock_left <= 5 ? 'low-stock' : ''}>
                  <td data-label="Name">{medicine.name}</td>
                  <td data-label="Price">₹{medicine.price}</td>
                  <td data-label="Discontinued">{medicine.Is_discontinued ? 'Yes' : 'No'}</td>
                  <td data-label="Manufacturer">{medicine.manufacturer_name}</td>
                  <td data-label="Type">{medicine.type}</td>
                  <td data-label="Pack Size">{medicine.pack_size_label}</td>
                  <td data-label="Stock Left">{medicine.stock_left}</td>
                  <td className="actions-column">
                    {editingMedicineId === medicine._id ? (
                      <>
                        <input
                          type="text"
                          name="name"
                          value={editedMedicine.name || ''}
                          onChange={handleEditInputChange}
                          placeholder="Name"
                        />
                        <input
                          type="number"
                          name="price"
                          value={editedMedicine.price || ''}
                          onChange={handleEditInputChange}
                          placeholder="Price"
                        />
                        <button className="edit-button" onClick={handleSaveEdit}>
                          Save
                        </button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="edit-button" onClick={() => handleEditMedicine(medicine)}>
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                        <button className="delete-button" onClick={() => handleDeleteMedicine(medicine._id)}>
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminStockManagement;