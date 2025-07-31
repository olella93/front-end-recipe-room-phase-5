import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  const navLinks = (
    <>
      <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
      <Link to="/recipes" onClick={() => setMenuOpen(false)}>Recipes</Link>
      {user && <Link to="/create-recipe" onClick={() => setMenuOpen(false)}>Create</Link>}
      {user && <Link to="/bookmarks" onClick={() => setMenuOpen(false)}>Bookmarks</Link>}
      {user && <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>}
      {!user && <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>}
      {!user && <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>}
      {user && <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>}
      {user && <Link to="/groups" onClick={() => setMenuOpen(false)}>Groups</Link>}
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🍲 Recipe Room</Link>
      </div>
      {/* Hamburger icon for mobile */}
      <button
        className="navbar-hamburger"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>
      {/* Desktop links */}
      <div className="navbar-links navbar-links-desktop">
        {navLinks}
      </div>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="navbar-mobile-overlay" onClick={() => setMenuOpen(false)}>
          <div className="navbar-links navbar-links-mobile" onClick={e => e.stopPropagation()}>
            {navLinks}
          </div>
        </div>
      )}
    </nav>
  );
}
