import React, { useState } from "react";
import Login from "./screens/Login.js";
import Register from "./screens/Register.js";
import Home from "./screens/Home.js";
import ProtectedRoute from "./ProtectedRoute.js";

import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";

export const GlobalContext = React.createContext();

export let loggedIn = {
  status: false,
  change: function () {
    this.status = true;
    console.log("log in function ", this.status);
  },
};

function App() {
  return (
    <div className='App'>
      <GlobalContext.Provider value={{ baseURL: "http://localhost:3001" }}>
        <h1
          style={{
            margin: "5px",
            backgroundColor: "white",
            borderRadius: "5px",
            paddingLeft: "20px",
          }}
        >
          spaceX launches
        </h1>

        <Switch>
          <Route exact path='/'>
            {" "}
            <Login loggedIn={loggedIn} />{" "}
          </Route>
          <Route exact path='/register'>
            {" "}
            <Register />{" "}
          </Route>
          <ProtectedRoute path='/home' component={Home} />
        </Switch>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
