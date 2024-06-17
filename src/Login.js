import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./admin/Images/ShawniksLogo.png";
import { message } from "antd";

export default function Login() {
  const [EmailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    // Validate input fields
    if (!EmailId || !password) {
      setError("Please enter both Email and password");
      message.error("Please enter both Email and password");
      return;
    }

    try {
      const response = await axios.post(
        "http://77.37.45.224:8000/api/user/EmployeeInfoLogin",
        { EmailId, Password: password }
      );

      console.log("API response:", response.data);

      if (response.data.success && response.data.loggedUser) {
        const { loggedUser } = response.data;

        console.log("Logged User:", loggedUser);

        if (loggedUser.Role && loggedUser.Role.includes("Admin")) {
          localStorage.setItem("user", JSON.stringify(loggedUser));
          navigate("/admin");
          message.success("Login successful!");
        } else if (loggedUser.Role && loggedUser.Role.includes("HR")) {
          localStorage.setItem("user", JSON.stringify(loggedUser));
          navigate("/hrpanel");
          message.success("Login successful!");
        } else {
          setError("Unauthorized role");
          message.error("Unauthorized role");
        }
      } else {
        setError(response.data.message || "Invalid Email or password");
        message.error(response.data.message || "Invalid Email or password");
      }
    } catch (error) {
      setError("Invalid Userdetails");
      console.error("Login error:", error);
      message.error("Invalid Userdetails.");
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
                value={EmailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter EmailId"
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
