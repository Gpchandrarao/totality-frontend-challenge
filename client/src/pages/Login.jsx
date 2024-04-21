import React, { useState } from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onchangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onchangePassword = (e) => {
    setPassword(e.target.value);
  };

  // useEffect(() => {
  //   const jwtToken = Cookies.get("jwt_token");
  //   if (jwtToken !== undefined) {
  //     return navigate("/");
  //   }
  // }, []);

  const onsubmitForm = async (e) => {
    e.preventDefault();
    const url = "https://totality-backend-fumd.onrender.com/user/login";
    try {
      const userDetails = { username, password };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const res = await fetch(url, options);
      const data = await res.json();
      if (res.ok) {
        setShowError(false);
        navigate("/Home");
      } else {
        setError(data.error);
        setShowError(true);
        Cookies.set("jwt_token", data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <form className="form-container" onSubmit={onsubmitForm}>
        <h1>Login</h1>
        <label htmlFor="username" className="label">
          URUERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input"
          placeholder="USERNAME"
          value={username}
          required
          autoFocus
          onChange={onchangeUsername}
        />
        <label htmlFor="password" className="label">
          password
        </label>
        <input
          type="password"
          id="password"
          className="input"
          placeholder="password"
          value={password}
          required
          onChange={onchangePassword}
        />
        <button type="submit" className="register-btn">
          Login
        </button>
        <Link to="/" className="link ">
          <button type="submit" className="register-btn craete-account">
            Create a account
          </button>
        </Link>
        {showError && <p className="error">*{error}</p>}
      </form>
    </div>
  );
};

export default Login;
