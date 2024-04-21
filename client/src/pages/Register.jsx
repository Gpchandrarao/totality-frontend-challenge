import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = () => {
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
    const url = "https://totality-backend-fumd.onrender.com/user/register";
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
    <div className="register-container">
      <div className="img-container">
        <h1>Resorts Rooms</h1>
      </div>
      <form className="form-container" onSubmit={onsubmitForm}>
        <h1>Register</h1>
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
          Register
        </button>
        {showError && <p className="error">*{error}</p>}
      </form>
    </div>
  );
};

export default Register;
