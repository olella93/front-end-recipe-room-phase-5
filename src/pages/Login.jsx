import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import heroCake from "../assets/images/orange-macarons-macaroons-cakes-with-cup-apricot-juice-white-wooden-background-orange-linen-textile-side-view-close-up-selective-focus_71985-7838.avif";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: authError, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (authError) {
      setError(authError.message || authError.error || "Login failed");
    }
  }, [authError]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
   
    dispatch(loginUser(formData));
  };

  return (
    <div className="login-wrapper">
      {/* <div className="login-hero">
        <img src={heroCake} alt="Delicious cake" className="login-hero-img" />
      </div> */}

      <form onSubmit={handleSubmit} className="login-container">
        <h2 className="login-heading">Welcome Back </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="input-field"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input-field"
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading} className="login-btn">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="login-bottom-link">Don't have an account? <Link to="/signup">Get Started</Link>
        </p>
        
      </form>
    </div>
  );
};

export default Login;
