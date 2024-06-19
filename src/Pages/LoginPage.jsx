import React, { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login=()=>{
    
    // const [err, seterr] = useState(false);
    const [email, setEmail] = useState("bhargavaraju@gmail.com");
    const [password, setPassword] = useState("123456");
    const [err, setErr] = useState(null);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        const successToast = toast.success("Successfully logged in", {
          position: "top-center",
          autoClose: 3000, // Auto close after 3 seconds
          hideProgressBar: false,
          onClose: () => {
            navigate("/");
          }
        });
        navigate("/");
      } catch (err) {
        // toast.error("Please provide valid credentials", {
        //   position: "top-center",
        //   autoClose: 3000, // Auto close after 3 seconds
        //   hideProgressBar: false,
        // });
        console.log("Error object:", err); // Log the error object for debugging
      if (err.code === "auth/invalid-credential") {
        toast.error("Wrong email. Please check your email and try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
        });
      } 
      }
    };

    return (
        <div className="formContainer">
            <ToastContainer/>
            <div className="fromWrapper">
                <span className="logo">Messenger Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit} >
                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="password"  value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button>Sign in</button>

                 </form>
                 <p>You don't have an account?<Link to="/register">Register</Link> </p>
                 
             </div>
             
          </div>
    )
}

export default Login;


