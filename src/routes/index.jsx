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

// ===== PÁGINAS DE ADMIN (importamos los componentes reales) =====
// Solo importamos los que YA CREAMOS
import AdminMascotas from '../pages/admin/mascotas/AdminMascotas';
import AdminMascotasNueva from '../pages/admin/mascotas/AdminMascotasNueva';

// Dashboard (se queda igual por ahora)
const AdminDashboard = () => (
  <div className="admin-dashboard">
    <h1>Dashboard Administrador</h1>
    <p>Bienvenido al panel de administración</p>
  </div>
);

// Adopciones (se queda igual por ahora)
const AdminAdopciones = () => (
  <div className="admin-page">
    <h1>Gestión de Adopciones</h1>
  </div>
);

// Usuarios (se queda igual por ahora)
const AdminUsuarios = () => (
  <div className="admin-page">
    <h1>Gestión de Usuarios</h1>
  </div>
);

// Donaciones (se queda igual por ahora)
const AdminDonaciones = () => (
  <div className="admin-page">
    <h1>Gestión de Donaciones</h1>
  </div>
);

// Eventos (se queda igual por ahora)
const AdminEventos = () => (
  <div className="admin-page">
    <h1>Gestión de Eventos</h1>
  </div>
);

// Reportes (se queda igual por ahora)
const AdminReportes = () => (
  <div className="admin-page">
    <h1>Reportes y Estadísticas</h1>
  </div>
);

// Configuración (se queda igual por ahora)
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
          // ===== MASCOTAS (AHORA USAN LOS COMPONENTES IMPORTADOS) =====
          {
            path: 'mascotas',
            element: <AdminMascotas />  // 👈 AHORA USA EL COMPONENTE REAL
          },
          {
            path: 'mascotas/nueva',
            element: <AdminMascotasNueva />  // 👈 AHORA USA EL COMPONENTE REAL
          },
          // Las demás rutas se quedan IGUAL
          {
            path: 'adopciones',
            element: <AdminAdopciones />
          },
          {
            path: 'usuarios',
            element: <AdminUsuarios />
          },
          {
            path: 'donaciones',
            element: <AdminDonaciones />
          },
          {
            path: 'eventos',
            element: <AdminEventos />
          },
          {
            path: 'reportes',
            element: <AdminReportes />
          },
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