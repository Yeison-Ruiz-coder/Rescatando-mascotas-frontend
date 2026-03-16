import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#f8f9fa'
      }}>
        <div className="spinner"></div>
        <p style={{ marginLeft: '10px' }}>Cargando...</p>
      </div>
    );
  }

  // Si no está autenticado, va al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado pero no es admin, va al home
  if (user?.tipo !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Si es admin, muestra el contenido
  return <Outlet />;
};

export default AdminRoute;