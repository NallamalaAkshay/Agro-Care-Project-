import React, { useContext, useState, useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import logo from '../images/logor.png';

const Navbar = ({ cartItems, userDetails, role }) => {
  const { user, Logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (userDetails && userDetails.userData) {
      setUserData(userDetails.userData);
    }
  }, [userDetails]);

  const handleLogout = () => {
    Logout(); // Clear user data from context
    navigate('/login'); // Redirect to login page after logout
  };

  const cartItemCount = cartItems.length; // Calculate the number of items in the cart

  return (
    <div>
      <div className="flex content-center bg-customGreen pb-auto">
        <div className="flex items-center cursor-pointer ml-auto lg:ml-16">
          <img className="h-16 w-auto object-contain" src={logo} alt="Logo" />
        </div>
        <div className="flex-2 w-12/12 mx-auto">
          <ul className="flex m-6 items-around items-center">
            <li
              onClick={() => navigate("/")}
              className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 lg:ml-7 ml-6 mr-1.5"
            >
              Home
            </li>

            {/* Role-based Navigation */}
            {role === "user" && (
              <>
                <li
                  onClick={() => navigate("/products")}
                  className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                >
                  Ecommerce Store
                </li>
                <li
                  onClick={() => navigate("/cart")}
                  className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                >
                  Cart {cartItemCount > 0 && <span className="cart-count">({cartItemCount})</span>}
                </li>
              </>
            )}

            {role === "farmer" && (
              <>
                <li
                  onClick={() => navigate("/weatherAlerts")}
                  className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                >
                  Weather Alerts
                </li>
                <li
                  onClick={() => navigate("/crop")}
                  className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                >
                  Crop Recommendation
                </li>
                <li
                  onClick={() => navigate("/fertilizer")}
                  className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                >
                  Fertilizer Recommendation
                </li>
                <li
                  onClick={() => navigate("/diseaseIdentification")}
                  className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                >
                  Disease Prediction
                </li>
                <li
                  onClick={() => navigate("/products")}
                  className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                >
                  Ecommerce Store
                </li>
                <li
                  onClick={() => navigate("/equipment")}
                  className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                >
                  Rent Here
                </li>
                <li
                  onClick={() => navigate("/cart")}
                  className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                >
                  Cart {cartItemCount > 0 && <span className="cart-count">({cartItemCount})</span>}
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li
                  onClick={() => navigate("/admin")}
                  className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                >
                  Admin Dashboard
                </li>
              </>
            )}

            {/* Authentication Links */}
            {!user ? (
              <li
                onClick={() => navigate("/login")}
                className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
              >
                Login
              </li>
            ) : (
              <>
                {userData && (
                  <p className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5">
                    Welcome, {userData.name}!
                  </p>
                )}
                <li
                  onClick={handleLogout}
                  className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                >
                  Logout
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
