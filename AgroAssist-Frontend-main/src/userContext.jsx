// UserContext.js
import { createContext, useEffect, useState } from 'react';
import {jwtDecode} from "jwt-decode"

export const UserContext = createContext(null);


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means no user is logged in initially

  const Login = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setUser(decodedToken.userId);
  };

  const Logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        if (decodedToken.userId) {
          setUser(decodedToken.userId);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        Logout();
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, Login, Logout }}>
      {children}
    </UserContext.Provider>
  );
};
