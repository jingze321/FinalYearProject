import React from "react";

import { Navigate, Route ,Outlet } from "react-router-dom";
import { useAuth } from "../firebase/Auth"

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    console.log(Component,'props');
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  }
