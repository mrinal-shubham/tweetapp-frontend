import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const user = localStorage.getItem("user");
  console.log("this", user);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="http://localhost:3000/" />
      }
    />
  );
}

export default ProtectedRoute;