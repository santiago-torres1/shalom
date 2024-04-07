import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const dev = 'http://localhost:3001/';
const prod = 'https://shalom-backend-86344e50bd95.herokuapp.com/';
const env = prod;
const AuthContext = createContext();

axios.defaults.withCredentials = true

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ name: null, isAdmin: false, isAuthenticated: false });
  useEffect(()=> {
    axios.get(env + 'api/authenticated').then((response) => {
      setUserData(response.data);
    })
  }, [])
  const login = async (email, password) => {
    try {
      const response = await axios.post(env + 'api/login', { email, password });
      setUserData(response);
      window.location.reload();
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(env + 'api/logout');
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
