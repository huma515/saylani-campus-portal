import React from 'react'
import { useState } from 'react';
import supabase from '../config/supabse'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const Signup = () => {

    const [value , setvalue] = useState({

         fullName : "",
         email:"",
         password : "",
         conpass : ""
    })

    const handleChange =(e) => {
    
    setvalue({
        ...value,
     [e.target.name]: e.target.value,
    })
    }

    const handleSubmit = async (e)=> {

 e.preventDefault()

  const { data, error } = await supabase.auth.signUp({
        email: value.email,
        password: value.password,
      });


      if(error){
        console.log(error)
      }

      else {
        console.log(data)
      }



    }





    














  return (
    <div className="login-container d-flex flex-column justify-content-center align-items-center vh-100">
      {/* Signup Form Card */}
      <div className="login-card card p-5 shadow-lg">
        <h2 className="login-heading text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit} >
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

          <button type="submit" className="btn login-btn w-100 mb-3">
            Sign Up
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

export default Signup