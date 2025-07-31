import React, { useState } from 'react';
import Notification from '../components/Notification';
import { useDispatch } from 'react-redux';
import { signup } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(formData)).unwrap();
      setNotification('Signup successful! You can now log in.');
      setTimeout(() => {
        setNotification('');
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  return (
    <div className="form-container signup-form-container">
      <h1 className="form-title">Sign Up</h1>
      <Notification message={notification} onClose={() => setNotification('')} />
      <form className="form signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="signup-username">Username</label>
          <input id="signup-username" type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="signup-email">Email</label>
          <input id="signup-email" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Password</label>
          <input id="signup-password" type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button className="form-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
}
