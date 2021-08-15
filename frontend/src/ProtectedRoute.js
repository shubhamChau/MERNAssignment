import React from "react";
import { Route, Redirect } from "react-router-dom";
import loggedIn from "./App.js";

const ProtectedRoute = ({ component: Component, path }) => {
  return (
    <Route
      path={path}
      render={(props) => (loggedIn ? <Component /> : <Redirect to='/' />)}
    />
  );
};

export default ProtectedRoute;
