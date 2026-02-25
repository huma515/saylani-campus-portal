import React, { useState } from "react";
import supabase from "../config/supabse";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { toast } from "react-toastify";

const Signup = () => {

  const [value, setvalue] = useState({
    fullName: "",
    email: "",
    password: "",
    conpass: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setvalue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Empty fields check
    if (!value.fullName || !value.email || !value.password || !value.conpass) {
      toast.error("Please fill all fields");
      return;
    }

    // ✅ Password match check
    if (value.password !== value.conpass) {
      toast.error("Passwords do not match");
      return;
    }

    // ✅ Password length check
    if (value.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: value.email,
        password: value.password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Signup successful! Check your email ✅");

        // form reset
        setvalue({
          fullName: "",
          email: "",
          password: "",
          conpass: "",
        });

        console.log(data);
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
      <div className="login-card card p-5 shadow-lg">
        <h2 className="login-heading text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control login-input"
              placeholder="Full Name"
              name="fullName"
              value={value.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control login-input"
              placeholder="Email Address"
              name="email"
              value={value.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control login-input"
              placeholder="Password"
              name="password"
              value={value.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <input
              type="password"
              className="form-control login-input"
              placeholder="Confirm Password"
              name="conpass"
              value={value.conpass}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn login-btn w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="text-center">
            <span className="text-muted">Already have an account? </span>
            <a href="#" className="signup-link">Login</a>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Signup;