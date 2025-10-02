import React, { useState, useEffect } from 'react';
import Products from './Products';
import UserInfo from './UserInfo'; // Import the UserInfo component
import './styles.css';

const AdminDashboard = () => {
  const [productsData, setProductsData] = useState([]);
  const [currentView, setCurrentView] = useState('products'); // State to toggle views

  useEffect(() => {
    // Fetch products data from the public folder
    fetch('/productsData.json')
      .then((response) => response.json())
      .then((data) => setProductsData(data));
  }, []);
  console.log(productsData)

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      
      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button onClick={() => setCurrentView('products')} className={currentView === 'products' ? 'active' : ''}>
          Products
        </button>
        <button onClick={() => setCurrentView('userInfo')} className={currentView === 'userInfo' ? 'active' : ''}>
          User Information
        </button>
      </div>

      <div className="dashboard-content">
        {/* Conditional Rendering of Products and UserInfo */}
        {currentView === 'products' && <Products productsData={productsData} />}
        {currentView === 'userInfo' && <UserInfo />}
      </div>
    </div>
  );
};

export default AdminDashboard;
