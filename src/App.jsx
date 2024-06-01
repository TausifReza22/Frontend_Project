import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import ActiveSaleOrders from './components/ActiveSaleOrders';
import CompletedSaleOrders from './components/CompleteSaleOrder';
import { ThemeContext, themes } from './components/ThemeContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState(themes.light);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || themes.light;
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const login = () => {
    setIsAuthenticated(true);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        <Router>
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/active" /> : <Login onLogin={login} />} />
            <Route path="/active" element={isAuthenticated ? <ActiveSaleOrders /> : <Navigate to="/login" />} />
            <Route path="/completed" element={isAuthenticated ? <CompletedSaleOrders /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
