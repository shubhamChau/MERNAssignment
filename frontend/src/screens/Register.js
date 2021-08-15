import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../App";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(GlobalContext);

  const handleRegister = (e) => {
    axios
      .post(context.baseURL + "/registerUser", { email, username, password })
      .then((res) => {
        alert("User Registered Successfully!");
      })
      .catch((e) => {
        alert(e.response.data.msg);
      });
  };

  return (
    <div id='registerScreen'>
      <div className='formField'>
        <span className='inputLabel'>Enter your email:</span>
        <input
          className='inputField'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className='formField'>
        <span className='inputLabel'>Enter your username:</span>
        <input
          className='inputField'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className='formField'>
        <span className='inputLabel'>Enter your password:</span>
        <input
          type='password'
          className='inputField'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleRegister}>Register</button>

      <button onClick={() => window.location.replace("http://localhost:3000/")}>
        {" "}
        Back{" "}
      </button>
    </div>
  );
};

export default Register;
