// src/pages/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase.config";
import { useNavigate } from "react-router";
import {Link} from  "react-router"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      alert("Google Login Failed: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded mb-3">
          Login
        </button>
      </form>
      <button onClick={handleGoogleLogin} className="w-full bg-black text-white p-2 rounded">
        Sign in with Google
      </button>
     <div className="flex justify-center items-center mt-2">
          <small>Don’t Have Account?</small>
          <Link to="/register" className="text-violet-600 ml-1">
            Register
          </Link>
        </div>

    </div>
  );
};

export default Login;
