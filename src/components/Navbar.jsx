import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import '../styles/global.css';
import logoImage from '../assets/images/recipe_room2.PNG';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="logo" id="logo">
        <Link to="/" className="logo-link" id="logo-link">
          <img src={logoImage} alt="Recipe Room" className="logo-image" id="logo-image" />
          <span className="logo-text" id="logo-text">Recipe Room</span>
        </Link>
      </div>

      <div className="nav-links" id="nav-links">
        <Link to="/" className="nav-link" id="nav-link-home">Home</Link>
        <Link to="/recipes" className="nav-link" id="nav-link-recipes">Recipes</Link>
        <Link to="/bookmarks" className="nav-link" id="nav-link-bookmarks">Bookmarks</Link>
        <Link to="/profile" className="nav-link" id="nav-link-profile">Profile</Link>

        {/* Conditional rendering based on authentication status */}
        {!isAuthenticated ? (

          // Show login and signup buttons when NOT logged in

          <>
            <Link to="/login" className="nav-link" id="nav-link-login">
              <button className="login-button" id="login-button">Log in</button>
            </Link>

            {/* <Link to="/signup" id="nav-link-signup">
              <button className="signup-button" id="signup-button">Sign Up</button>
            </Link> */}

            <Link to="/signup" id="nav-link-signup">
              <button className="signup-button" id="signup-button">Sign Up</button>
            </Link>

          </>
        ) : (
          // Show logout button and user info when logged in
          <>
            {user && (
              <span className="nav-link welcome-text" id="welcome-text">
                Welcome, {user.username}
              </span>
            )}
            <button onClick={handleLogout} className="logout-button" id="logout-button">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
