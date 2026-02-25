import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Signup from "./components/Signup";
import Login from "./components/Login";

// ✅ React Toastify import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./components/Main";
import PostPage from "./components/PostPage";

function App() {

  return (
    <>
      {/* ✅ Toast container (IMPORTANT) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      {/* Components */}
      <Login />
      <Signup />
      <Main/>
      <PostPage/>
    </>
  );
}

export default App;