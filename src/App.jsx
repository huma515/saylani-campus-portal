
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// ✅ React Toastify import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouterApp from "./routing/RouterApp";


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

      
      <RouterApp/>
    </>
  );
}

export default App;