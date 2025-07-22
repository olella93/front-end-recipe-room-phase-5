import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.includes('@')) newErrors.email = 'Email is invalid';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(registerUser(formData));
    }
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-heading">Get Started</h2>

        {user && <p className="success-text">Signed up successfully!</p>}
        {error && <p className="error-text">Something went wrong: {error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="input-field"
        />
        {errors.username && <p className="error-text">{errors.username}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button type="submit" disabled={loading} className="signup-btn">
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <p className='switch-auth-link'>Already have an account?  <button><link to = "/login" />Log in </button></p>

      </form>
    </div>
  );
};

export default Signup;
