import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "@context/appContext";

const AdminDashboard = () => {
  const { user } = useAppContext();

  // Check if user has admin or super-admin role
  if (user.role !== "Admin" && user.role !== "Super-Admin") {
    return <Navigate to="/not-authorize" />;
  } // redirect to error page

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
