import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import supabase from "../config/supabse";
import { toast } from "react-toastify";

const Login = () => {

  const [loginval, setLoginval] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginval({
      ...loginval,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Empty fields check
    if (!loginval.email || !loginval.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginval.email,
        password: loginval.password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Login successful ✅");
        console.log(data);

        // form reset
        setLoginval({
          email: "",
          password: "",
        });

        // 👉 future me yahan redirect kar sakti ho
        // navigate("/dashboard")
      }

    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex flex-column justify-content-center align-items-center vh-100">

      {/* Logo */}
      <img
        src="https://lms.saylanimit.com/assets/logo.6lrMPvRL.png"
        alt="Logo"
        className="login-logo mb-4"
      />

      {/* Login Form Card */}
      <div className="login-card card p-5 shadow-lg">
        <h2 className="login-heading text-center mb-4">Welcome Back</h2>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control login-input"
              placeholder="Enter your email"
              name="email"
              value={loginval.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              className="form-control login-input"
              placeholder="Password"
              name="password"
              value={loginval.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn login-btn w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center">
            <span className="text-muted">Don’t have an account? </span>
            <a href="#" className="signup-link">Sign Up</a>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;