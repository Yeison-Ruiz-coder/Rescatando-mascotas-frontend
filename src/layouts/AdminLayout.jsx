import React from "react";
import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/layout/PublicNavbar/PublicNavbar";
import AdminSidebar from "../components/layout/AdminSidebar/AdminSidebar";
import { useSidebar } from "../context/SidebarContext";
import "./AdminLayout.css";

const AdminLayout = () => {
  const { isAdminSidebarOpen } = useSidebar();

  return (
    <div className="admin-layout">
      <PublicNavbar />
      <AdminSidebar />
      
      {isAdminSidebarOpen && <div className="admin-overlay" />}
      
      <main className={`admin-main-content ${isAdminSidebarOpen ? "shifted" : ""}`}>
        <div className="container-fluid py-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;