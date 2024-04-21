import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const dev = 'http://localhost:3001/';
const prod = 'https://api.tiendashalom.top/';
const url = prod;
const AuthContext = createContext();

axios.defaults.withCredentials = true

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ name: null, email: null, isAdmin: false, isAuthenticated: false });
  useEffect(()=> {
    axios.get(url + 'api/authenticated').then((response) => {
      setUserData(response.data);
    })
  }, [])
  
  const login = async (email, password) => {
    try {
      const response = await axios.post(url + 'api/login', { email, password });
      setUserData(response);
      window.location.reload();
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(url + 'api/logout');
      setUserData({ name: null, isAdmin: false, isAuthenticated: false });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout, url }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
