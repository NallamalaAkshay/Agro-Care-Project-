import React, { useContext, useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import './style.css';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Signup from './components/signup';
import Fertilizer from './components/Fertilizer';
import Crop from './components/CropRecommendation';
import Weather from './Weather';
import { UserContext, UserProvider } from './userContext';
import { Login } from "./components/login";
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import AdminDashboard from "./components/admin/AdminDashboard";
import DiseaseIdentification from './components/DiseaseIdentification';
import RentalEquipment from './components/Equipment';
import { baseURL } from './lib';
import axios from 'axios';

function App() {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [role, setRole] = useState('');

  // Fetch user details
  useEffect(() => {
    if (user) {
      const getUserDetails = async () => {
        try {
          const response = await axios.post(`${baseURL}/api/getUser`, { userId: user });
          const data = response.data;
          setUserDetails(data);
          console.log("User details fetched:", data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      getUserDetails();
    }
  }, [user]);

  // Update role when userDetails changes
  useEffect(() => {
    if (userDetails.userData) {
      setRole(userDetails.userData.role);
      console.log("Role updated:", userDetails.userData.role);
    }
  }, [userDetails]);

  const addToCart = async (product) => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/users/${user}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart);
      } else {
        console.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/users/${user}/cart/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart); // Update cart dynamically
      } else {
        console.error("Failed to remove from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <div className="App">
      <Navbar cartItems={cartItems} userDetails={userDetails} role={role} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<AdminDashboard />} />
        {user && role === "user" ? (
          <>
            <Route path='/products' element={<ProductList addToCart={addToCart} />} />
            <Route path='/product/:id' element={<ProductPage addToCart={addToCart} />} />
            <Route path='/cart' element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          </>
        ) : null}
        {user && role === "farmer" ? (
          <>
            <Route path='/fertilizer' element={<Fertilizer />} />
            <Route path='/products' element={<ProductList addToCart={addToCart} />} />
            <Route path='/product/:id' element={<ProductPage addToCart={addToCart} />} />
            <Route path='/cart' element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
            <Route path='/crop' element={<Crop />} />
            <Route path='/WeatherAlerts' element={<Weather />} />
            <Route path='/DiseaseIdentification' element={<DiseaseIdentification />} />
            <Route path='/equipment' element={<RentalEquipment />} />
          </>
        ) : (
          <>
            <Route path='/weatherAlerts' element={<Login />} />
            <Route path='/fertilizer' element={<Login />} />
            <Route path='/crop' element={<Login />} />
            <Route path='/DiseaseIdentification' element={<Login />} />
            <Route path='/equipment' element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
