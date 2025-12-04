import { Navigate, Outlet } from "react-router";

export default function Guest() {
  const token = localStorage.getItem("authToken");
  if (token) {
    return <Navigate to="/user" replace />;
  }
  return <Outlet />;
}
