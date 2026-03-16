import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar/PublicNavbar'; 
import Footer from '../components/layout/Footer/Footer';

const UserLayout = () => {
  return (
    <div className="user-layout">
      <PublicNavbar /> {/* ANTES ERA Navbar */}
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;