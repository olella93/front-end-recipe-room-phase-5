import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import logoImage from '../assets/images/recipe_room2.PNG'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={logoImage} alt="Recipe Room" className="logo-image" />
          <span className="logo-text"></span>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/recipes" className="nav-link">Recipes</Link>
        <Link to="/bookmarks" className="nav-link">Bookmark</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/login">
          <button className="login-button">Log in</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
