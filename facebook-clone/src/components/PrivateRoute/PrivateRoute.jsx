import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem("users");

  return (
    <Route
      {...rest}
      element={
        isLoggedIn ? <Component /> : <Navigate to="/login-user" replace />
      }
    />
  );
};

export default PrivateRoute;
