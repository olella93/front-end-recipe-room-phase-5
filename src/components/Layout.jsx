import React from 'react';
import { Outlet } from 'react-router-dom'; // <-- This is fine, keeps the placeholder for child routes
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Navbar /> 
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
