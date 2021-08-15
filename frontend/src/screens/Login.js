import React, { useState, useContext } from "react";

import { GlobalContext } from "../App.js";
import axios from "axios";

const Login = ({ loggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(GlobalContext);
  const handleLogin = (e) => {
    axios
      .post(context.baseURL + "/loginUser", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("Authorisation", res.data.user);
        console.log(GlobalContext);
        loggedIn.change();
        window.location.replace(window.location.href + "home");
      })
      .catch((e) => alert(e.response.data.msg));
  };

  return (
    <div id='loginScreen'>
      <div className='formField'>
        <span className='inputLabel'>Enter your email:</span>
        <input
          className='inputField'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='formField'>
        <span className='inputLabel'>Enter password:</span>
        <input
          className='inputField'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}> Log in </button>

      <h2> new user ? </h2>
      <button
        onClick={() => {
          console.log();
          window.location.replace(window.location.href + "register");
        }}
      >
        Register
      </button>
    </div>
  );
};

export default Login;
