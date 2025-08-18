import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouter = () => {
  const { user } = useContext(UserContext);

  if (user.email === '') {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};