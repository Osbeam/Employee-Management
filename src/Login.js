import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./Images/ShawniksLogo.png";
import { message } from "antd";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    // Validate input fields
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    console.log("Login button clicked");
    console.log("Email and Password provided", { email, password });

    try {
      const response = await axios.post(
        "http://77.37.45.224:3000/api/user/login",
        { Email: email, Password: password }
      );

      console.log("API response:", response);

      if (response.data.success && response.data.loggedUser) {
        localStorage.setItem("user", JSON.stringify(response.data.loggedUser));
        navigate("/admin");
      } else {
        setError(response.data.message || "Invalid email or password");
        console.log("Login failed:", response.data.message);
        message.error("Invalid user details"); 
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", error);
      message.error("An error occurred during login. Please try again."); 
    }
  }

  return (
    <div className="main">
      <div className="main-container">
        <div className="left-container">
          <div className="left-contnr-items">
            <img src={logo} alt="Logo" />
          </div>
        </div>
        <div className="right-container">
          <form onSubmit={handleLogin}>
            <div className="form-div">
              <h1>Hello Admin!</h1>
              <p>Welcome back</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter username"
                className="input-login"
              />
              <br />
              <input
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                className="input-login"
              />
              <br />
              <button type="submit" className="Link">
                Login
              </button>
              {error && <p className="error-message">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
