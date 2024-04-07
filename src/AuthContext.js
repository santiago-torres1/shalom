import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ name: null, isAdmin: false, isAuthenticated: false });

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://shalom-backend-86344e50bd95.herokuapp.com/api/login', { email, password });
      setUserData(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('https://shalom-backend-86344e50bd95.herokuapp.com/api/logout');
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
