import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar/>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
