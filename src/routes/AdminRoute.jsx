// routes/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

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
        <LoadingSpinner />
        <p style={{ marginLeft: '10px', color: '#764ba2' }}>Cargando...</p>
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