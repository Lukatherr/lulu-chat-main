import "../styles/Register.scss"
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";



const Login = () => {

    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
        
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/")
      }
        catch (err) {
        setErr(true);
        console.log(err)
        // setLoading(false);
      }
    };

    return ( 
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Lulu chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                <input type="email" name="" id="" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button>Sign up</button>
                {err && <span>Something went wrong, please try again</span>}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
        
     );
}
 
export default Login;