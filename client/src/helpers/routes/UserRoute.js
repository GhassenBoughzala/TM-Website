import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function UserRoute() {
  const [userLocal] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  return userLocal ? <Outlet /> : <Navigate to="/login" />;
}

export default UserRoute;
