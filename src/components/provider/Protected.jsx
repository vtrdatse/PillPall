import React from "react";
import { Redirect } from "react-router-dom";

const Protected = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Redirect to="/sign-in" />;
  }

  return children;
};

export default Protected;
