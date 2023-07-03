import React, { useState } from "react";
import { Route, useNavigate } from "react-router-dom";

function AdminRoute({ component: Component, ...rest }) {
  const nav = useNavigate();
  const [userLocal] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        userLocal.role === "admin" ? (
          <Component {...props} />
        ) : (
          nav('/admin-dashboard')
        )
      }
    />
  );
}

export default AdminRoute;
