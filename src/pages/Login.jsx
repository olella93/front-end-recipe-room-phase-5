import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authAPI";
import heroCake from "../assets/images/orange-macarons-macaroons-cakes-with-cup-apricot-juice-white-wooden-background-orange-linen-textile-side-view-close-up-selective-focus_71985-7838.avif";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(formData);
      const token = res.access_token;

      localStorage.setItem("access_token", token);
      dispatch(loginUser(token));
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-hero">
        <img src={heroCake} alt="Delicious cake" className="login-hero-img" />
      </div>

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

        <p className="login-bottom-link">Don't have an account?<link to="/signup">Get Started</link>
        </p>
        
      </form>
    </div>
  );
};

export default Login;
