import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar/PublicNavbar';
import PublicSidebar from '../components/layout/PublicSidebar/PublicSidebar';
import Footer from '../components/layout/Footer/Footer';
import { useSidebar } from '../context/SidebarContext';
import './PublicLayout.css';

const PublicLayout = () => {
  const { isPublicSidebarOpen } = useSidebar();

  return (
    <div className="public-layout">
      <PublicNavbar />
      <PublicSidebar />
      
      {isPublicSidebarOpen && <div className="public-sidebar-overlay active" />}
      
      <main className={`public-main-content ${isPublicSidebarOpen ? 'shifted' : ''}`}>
        <div className="container">
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicLayout;