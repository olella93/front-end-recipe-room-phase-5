import React from 'react';
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

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🍲 Recipe Room</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {user && <Link to="/create-recipe">Create</Link>}
        {user && <Link to="/bookmarks">Bookmarks</Link>}
        {user && <Link to="/profile">Profile</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Sign Up</Link>}
        {user && <button onClick={handleLogout}>Logout</button>}
        {user && <Link to="/groups">Groups</Link>}

      </div>
    </nav>
  );
}
