// layouts/AdminLayout.jsx - Versión con diseño mejorado
import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, X, LayoutDashboard, Users, PawPrint, Heart, 
  ShoppingBag, Calendar, Building2, Activity, LogOut, 
  User, ChevronDown, Bell, Search, Settings, HelpCircle,
  TrendingUp, Award, Star
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: '#667eea' },
    { path: '/admin/usuarios', label: 'Usuarios', icon: Users, color: '#48bb78' },
    { path: '/admin/mascotas', label: 'Mascotas', icon: PawPrint, color: '#ed8936' },
    { path: '/admin/adopciones', label: 'Adopciones', icon: Heart, color: '#f687b3' },
    { path: '/admin/productos', label: 'Productos', icon: ShoppingBag, color: '#9f7aea' },
    { path: '/admin/eventos', label: 'Eventos', icon: Calendar, color: '#4299e1' },
    { path: '/admin/fundaciones', label: 'Fundaciones', icon: Building2, color: '#38b2ac' },
    { path: '/admin/reportes', label: 'Reportes', icon: Activity, color: '#f56565' },
  ];
  
  const notifications = [
    { id: 1, title: 'Nueva adopción pendiente', time: 'Hace 5 min', read: false, type: 'adoption' },
    { id: 2, title: 'Reporte de rescate urgente', time: 'Hace 15 min', read: false, type: 'rescue' },
    { id: 3, title: 'Donación recibida', time: 'Hace 1 hora', read: true, type: 'donation' },
    { id: 4, title: 'Nuevo usuario registrado', time: 'Hace 2 horas', read: true, type: 'user' },
  ];
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  const getAvatarUrl = () => {
    if (!user?.avatar) return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nombre || 'Admin')}&background=667eea&color=fff&bold=true&size=40`;
    if (user.avatar.startsWith('http')) return user.avatar;
    return `/storage/${user.avatar}`;
  };
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f0f2f5' }}>
      {/* Sidebar Desktop */}
      <div style={{
        width: '280px',
        background: 'linear-gradient(180deg, #1a1f2e 0%, #0f1119 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
      }}>
        {/* Logo Area */}
        <div style={{ 
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <PawPrint size={24} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Rescatando</h2>
              <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>Panel de Administración</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0 16px', overflowY: 'auto' }}>
          <p style={{ 
            fontSize: '12px', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '12px',
            paddingLeft: '12px'
          }}>
            Menú Principal
          </p>
          {menuItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  marginBottom: '4px',
                  borderRadius: '12px',
                  background: active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = 'transparent';
                }}
              >
                <Icon size={20} />
                <span style={{ fontWeight: active ? 600 : 400 }}>{item.label}</span>
                {active && (
                  <div style={{
                    marginLeft: 'auto',
                    width: '6px',
                    height: '6px',
                    background: '#fff',
                    borderRadius: '50%',
                  }} />
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* User Info & Logout */}
        <div style={{ 
          padding: '20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          marginTop: 'auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
            padding: '8px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
          }}>
            <img
              src={getAvatarUrl()}
              alt={user?.nombre}
              style={{ width: '40px', height: '40px', borderRadius: '12px', objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>{user?.nombre}</p>
              <p style={{ fontSize: '11px', opacity: 0.7, margin: 0 }}>Administrador</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '10px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        marginLeft: '280px',
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        background: '#f0f2f5'
      }}>
        {/* Header */}
        <header style={{
          background: '#fff',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 90,
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
            className="mobile-menu-btn"
          >
            <Menu size={24} />
          </button>
          
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#f5f7fa',
            padding: '8px 16px',
            borderRadius: '12px',
            width: '300px',
          }}>
            <Search size={18} color="#94a3b8" />
            <input
              type="text"
              placeholder="Buscar..."
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                width: '100%',
              }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                style={{
                  background: '#f5f7fa',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <Bell size={20} color="#4a5568" />
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '8px',
                  height: '8px',
                  background: '#f56565',
                  borderRadius: '50%',
                }} />
              </button>
              
              {notificationsOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '12px',
                  width: '320px',
                  background: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  zIndex: 100,
                }}>
                  <div style={{
                    padding: '16px',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Notificaciones</h4>
                    <button style={{ color: '#667eea', background: 'none', border: 'none', fontSize: '12px', cursor: 'pointer' }}>
                      Marcar todas como leídas
                    </button>
                  </div>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {notifications.map(notif => (
                      <div key={notif.id} style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid #f1f5f9',
                        background: notif.read ? 'transparent' : '#fef5e7',
                        cursor: 'pointer',
                      }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: notif.read ? 400 : 600 }}>{notif.title}</p>
                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* User Menu */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '12px',
                }}
              >
                <img
                  src={getAvatarUrl()}
                  alt={user?.nombre}
                  style={{ width: '40px', height: '40px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>{user?.nombre}</p>
                  <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>Administrador</p>
                </div>
                <ChevronDown size={16} color="#718096" />
              </button>
              
              {userMenuOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '12px',
                  width: '240px',
                  background: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  zIndex: 100,
                }}>
                  <Link
                    to="/admin/perfil"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      color: '#2d3748',
                      textDecoration: 'none',
                      borderRadius: '16px 16px 0 0',
                    }}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>Mi Perfil</span>
                  </Link>
                  <Link
                    to="/admin/configuracion"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      color: '#2d3748',
                      textDecoration: 'none',
                    }}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings size={18} />
                    <span>Configuración</span>
                  </Link>
                  <Link
                    to="/admin/ayuda"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      color: '#2d3748',
                      textDecoration: 'none',
                    }}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <HelpCircle size={18} />
                    <span>Ayuda</span>
                  </Link>
                  <div style={{ borderTop: '1px solid #e2e8f0', margin: '4px 0' }} />
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      handleLogout();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#f56565',
                      borderRadius: '0 0 16px 16px',
                    }}
                  >
                    <LogOut size={18} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main style={{ 
          flex: 1, 
          overflowY: 'auto',
          padding: '24px 32px',
        }}>
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 200,
            }}
            onClick={() => setSidebarOpen(false)}
          />
          <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            width: '280px',
            background: 'linear-gradient(180deg, #1a1f2e 0%, #0f1119 100%)',
            zIndex: 201,
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease',
          }}>
            {/* Mobile sidebar content (same as desktop) */}
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <PawPrint size={24} color="#fff" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Rescatando</h2>
                    <p style={{ fontSize: '10px', opacity: 0.7, margin: 0 }}>Panel de Administración</p>
                  </div>
                </div>
                <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#fff' }}>
                  <X size={20} />
                </button>
              </div>
            </div>
            <nav style={{ padding: '16px' }}>
              {menuItems.map(item => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      marginBottom: '4px',
                      borderRadius: '12px',
                      background: active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                      color: '#fff',
                      textDecoration: 'none',
                    }}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 'auto' }}>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLayout;