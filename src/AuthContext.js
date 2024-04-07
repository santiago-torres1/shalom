import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const dev = 'http://localhost:3001/';
const prod = 'https://shalom-backend-86344e50bd95.herokuapp.com/';
const AuthContext = createContext();

axios.defaults.withCredentials = true

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ name: null, isAdmin: false, isAuthenticated: false });
  useEffect(()=> {
    axios.get(dev + 'api/authenticated').then((response) => {
      console.log(response)
    })
  })
  const login = async (email, password) => {
    try {
      const response = await axios.post(dev + 'api/login', { email, password });
      setUserData(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(dev + 'api/logout');
      setUserData({ name: null, isAdmin: false, isAuthenticated: false });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
