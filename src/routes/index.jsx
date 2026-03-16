import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Páginas públicas
import Home from '../pages/public/Home/Home';
import Login from '../pages/public/Login/Login';
import Register from '../pages/public/Register/Register';
import Mascotas from '../pages/public/Mascotas/Mascotas';

// Componentes de rutas protegidas
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// ===== PÁGINAS DE ADMIN =====
// Dashboard
const AdminDashboard = () => (
  <div className="admin-dashboard">
    <h1>Dashboard Administrador</h1>
    <p>Bienvenido al panel de administración</p>
  </div>
);

// Mascotas
const AdminMascotas = () => (
  <div className="admin-page">
    <h1>Gestión de Mascotas</h1>
  </div>
);

const AdminMascotasNueva = () => (
  <div className="admin-page">
    <h1>Registrar Nueva Mascota</h1>
  </div>
);

// Adopciones
const AdminAdopciones = () => (
  <div className="admin-page">
    <h1>Gestión de Adopciones</h1>
  </div>
);

// Usuarios
const AdminUsuarios = () => (
  <div className="admin-page">
    <h1>Gestión de Usuarios</h1>
  </div>
);

// Donaciones
const AdminDonaciones = () => (
  <div className="admin-page">
    <h1>Gestión de Donaciones</h1>
  </div>
);

// Eventos
const AdminEventos = () => (
  <div className="admin-page">
    <h1>Gestión de Eventos</h1>
  </div>
);

// Reportes
const AdminReportes = () => (
  <div className="admin-page">
    <h1>Reportes y Estadísticas</h1>
  </div>
);

// Configuración
const AdminConfiguracion = () => (
  <div className="admin-page">
    <h1>Configuración</h1>
  </div>
);

const router = createBrowserRouter([
  // ===== RUTAS PÚBLICAS =====
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'mascotas',
        element: <Mascotas />
      }
    ]
  },

  // ===== RUTAS DE ADMIN (PROTEGIDAS) =====
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/admin/dashboard" replace />
          },
          {
            path: 'dashboard',
            element: <AdminDashboard />
          },
          // Mascotas
          {
            path: 'mascotas',
            element: <AdminMascotas />
          },
          {
            path: 'mascotas/nueva',
            element: <AdminMascotasNueva />
          },
          // Adopciones
          {
            path: 'adopciones',
            element: <AdminAdopciones />
          },
          // Usuarios
          {
            path: 'usuarios',
            element: <AdminUsuarios />
          },
          // Donaciones
          {
            path: 'donaciones',
            element: <AdminDonaciones />
          },
          // Eventos
          {
            path: 'eventos',
            element: <AdminEventos />
          },
          // Reportes
          {
            path: 'reportes',
            element: <AdminReportes />
          },
          // Configuración
          {
            path: 'configuracion',
            element: <AdminConfiguracion />
          }
        ]
      }
    ]
  },

  // ===== RUTAS DE USUARIO (PROTEGIDAS) =====
  {
    path: '/user',
    element: <PrivateRoute />,
    children: [
      {
        path: 'dashboard',
        element: <div>Dashboard de Usuario</div>
      },
      {
        path: 'perfil',
        element: <div>Mi Perfil</div>
      },
      {
        path: 'mis-solicitudes',
        element: <div>Mis Solicitudes</div>
      }
    ]
  },

  // ===== RUTA POR DEFECTO (404) =====
  {
    path: '*',
    element: <div>404 - Página no encontrada</div>
  }
]);

export default router;