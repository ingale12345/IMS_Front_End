import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRouter({ children }) {
  const token = useSelector((state) => state.loginReducer.token);
  // console.log("Protected Route", token);
  if (token) {
    return children;
  }
  return <Navigate to={"/login"} />;
}

export default ProtectedRouter;
