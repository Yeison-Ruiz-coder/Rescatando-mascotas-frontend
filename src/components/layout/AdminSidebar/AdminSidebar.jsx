import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import { useSidebar } from '../../../context/SidebarContext';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const { t } = useTranslation('layout');
  const { user, logout } = useAuth();
  const { isAdminSidebarOpen, closeAdminSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    closeAdminSidebar();
    navigate('/');
  };

  return (
    <nav className={`side-menu ${isAdminSidebarOpen ? 'open' : ''}`}>
      {/* Header del menú */}
      <div className="menu-header">
        <div className="user-info">
          <div className="user-avatar">
            <i className="fas fa-user-shield"></i>
          </div>
          <div className="user-details">
            <h5>{user?.nombre || 'Administrador'}</h5>
            <span className="user-role">{t('navbar.administrador')}</span>
          </div>
        </div>
        <button className="close-menu" onClick={closeAdminSidebar}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Búsqueda */}
      <div className="menu-search">
        <i className="fas fa-search"></i>
        <input type="text" placeholder={t('admin.buscar')} />
      </div>

      {/* Secciones del menú */}
      <div className="menu-sections">
        {/* Dashboard */}
        <div className="menu-section">
          <Link 
            to="/admin/dashboard" 
            className={`menu-item ${isActive('/admin/dashboard') ? 'active' : ''}`}
            onClick={closeAdminSidebar}
          >
            <i className="fas fa-tachometer-alt"></i>
            <span>{t('admin.dashboard')}</span>
          </Link>
        </div>

        {/* MÓDULO PRINCIPAL: Mascotas */}
        <div className="menu-section">
          <div 
            className={`menu-item has-submenu ${isActive('/admin/mascotas') || isActive('/admin/rescates') || isActive('/admin/razas') ? 'active' : ''}`}
            onClick={() => toggleSection('mascotas')}
          >
            <i className="fas fa-paw"></i>
            <span>{t('admin.gestion_mascotas')}</span>
            <i className={`fas fa-chevron-right arrow ${openSections.mascotas ? 'open' : ''}`}></i>
          </div>
          <div className={`submenu ${openSections.mascotas ? 'open' : ''}`}>
            <Link 
              to="/admin/mascotas" 
              className={`submenu-item ${isActive('/admin/mascotas') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-list"></i> {t('admin.todas_mascotas')}
            </Link>
            <Link 
              to="/admin/mascotas/nueva" 
              className={`submenu-item ${isActive('/admin/mascotas/nueva') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-plus-circle"></i> {t('admin.registrar_nueva')}
            </Link>
            <Link 
              to="/admin/rescates" 
              className={`submenu-item ${isActive('/admin/rescates') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-ambulance"></i> {t('admin.rescates_activos')}
            </Link>
            <Link 
              to="/admin/razas" 
              className={`submenu-item ${isActive('/admin/razas') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-dna"></i> {t('admin.catalogo_razas')}
            </Link>
          </div>
        </div>

        {/* Adopciones y Apadrinamientos */}
        <div className="menu-section">
          <div 
            className={`menu-item has-submenu ${isActive('/admin/adopciones') || isActive('/admin/apadrinamientos') ? 'active' : ''}`}
            onClick={() => toggleSection('adopciones')}
          >
            <i className="fas fa-heart"></i>
            <span>{t('admin.adopciones_apadrinamientos')}</span>
            <i className={`fas fa-chevron-right arrow ${openSections.adopciones ? 'open' : ''}`}></i>
          </div>
          <div className={`submenu ${openSections.adopciones ? 'open' : ''}`}>
            <Link 
              to="/admin/adopciones" 
              className={`submenu-item ${isActive('/admin/adopciones') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-home"></i> {t('admin.adopciones')}
            </Link>
            <Link 
              to="/admin/solicitudes" 
              className={`submenu-item ${isActive('/admin/solicitudes') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-clipboard-list"></i> {t('admin.solicitudes_pendientes')}
            </Link>
            <Link 
              to="/admin/apadrinamientos" 
              className={`submenu-item ${isActive('/admin/apadrinamientos') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-star"></i> {t('admin.apadrinamientos')}
            </Link>
          </div>
        </div>

        {/* Donaciones y Eventos */}
        <div className="menu-section">
          <div 
            className={`menu-item has-submenu ${isActive('/admin/donaciones') || isActive('/admin/eventos') ? 'active' : ''}`}
            onClick={() => toggleSection('donaciones')}
          >
            <i className="fas fa-hand-holding-heart"></i>
            <span>{t('admin.donaciones_eventos')}</span>
            <i className={`fas fa-chevron-right arrow ${openSections.donaciones ? 'open' : ''}`}></i>
          </div>
          <div className={`submenu ${openSections.donaciones ? 'open' : ''}`}>
            <Link 
              to="/admin/donaciones" 
              className={`submenu-item ${isActive('/admin/donaciones') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-donate"></i> {t('admin.donaciones')}
            </Link>
            <Link 
              to="/admin/eventos" 
              className={`submenu-item ${isActive('/admin/eventos') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-calendar-alt"></i> {t('admin.eventos')}
            </Link>
            <Link 
              to="/admin/reportes/financieros" 
              className={`submenu-item ${isActive('/admin/reportes/financieros') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-chart-line"></i> {t('admin.reportes_financieros')}
            </Link>
          </div>
        </div>

        {/* Fundaciones y Veterinarias */}
        <div className="menu-section">
          <div 
            className={`menu-item has-submenu ${isActive('/admin/fundaciones') || isActive('/admin/veterinarias') ? 'active' : ''}`}
            onClick={() => toggleSection('fundaciones')}
          >
            <i className="fas fa-building"></i>
            <span>{t('admin.fundaciones_veterinarias')}</span>
            <i className={`fas fa-chevron-right arrow ${openSections.fundaciones ? 'open' : ''}`}></i>
          </div>
          <div className={`submenu ${openSections.fundaciones ? 'open' : ''}`}>
            <Link 
              to="/admin/fundaciones" 
              className={`submenu-item ${isActive('/admin/fundaciones') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-building"></i> {t('admin.fundaciones')}
            </Link>
            <Link 
              to="/admin/veterinarias" 
              className={`submenu-item ${isActive('/admin/veterinarias') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-clinic-medical"></i> {t('admin.veterinarias')}
            </Link>
          </div>
        </div>

        {/* Tienda */}
        <div className="menu-section">
          <div 
            className={`menu-item has-submenu ${isActive('/admin/tienda') ? 'active' : ''}`}
            onClick={() => toggleSection('tienda')}
          >
            <i className="fas fa-store"></i>
            <span>{t('admin.tienda')}</span>
            <i className={`fas fa-chevron-right arrow ${openSections.tienda ? 'open' : ''}`}></i>
          </div>
          <div className={`submenu ${openSections.tienda ? 'open' : ''}`}>
            <Link 
              to="/admin/tienda/productos" 
              className={`submenu-item ${isActive('/admin/tienda/productos') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-box"></i> {t('admin.productos')}
            </Link>
            <Link 
              to="/admin/tienda/ventas" 
              className={`submenu-item ${isActive('/admin/tienda/ventas') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-shopping-cart"></i> {t('admin.ventas')}
            </Link>
            <Link 
              to="/admin/tienda/inventario" 
              className={`submenu-item ${isActive('/admin/tienda/inventario') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-warehouse"></i> {t('admin.inventario')}
            </Link>
          </div>
        </div>

        {/* Reportes y Estadísticas */}
        <div className="menu-section">
          <div 
            className={`menu-item has-submenu ${isActive('/admin/reportes') ? 'active' : ''}`}
            onClick={() => toggleSection('reportes')}
          >
            <i className="fas fa-chart-bar"></i>
            <span>{t('admin.reportes_estadisticas')}</span>
            <i className={`fas fa-chevron-right arrow ${openSections.reportes ? 'open' : ''}`}></i>
          </div>
          <div className={`submenu ${openSections.reportes ? 'open' : ''}`}>
            <Link 
              to="/admin/reportes" 
              className={`submenu-item ${isActive('/admin/reportes') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-chart-pie"></i> {t('admin.reportes_generales')}
            </Link>
            <Link 
              to="/admin/reportes/exportar" 
              className={`submenu-item ${isActive('/admin/reportes/exportar') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-file-export"></i> {t('admin.exportar_datos')}
            </Link>
          </div>
        </div>

        {/* Comunicación */}
        <div className="menu-section">
          <div 
            className={`menu-item has-submenu ${isActive('/admin/notificaciones') || isActive('/admin/comentarios') ? 'active' : ''}`}
            onClick={() => toggleSection('comunicacion')}
          >
            <i className="fas fa-bell"></i>
            <span>{t('admin.comunicacion')}</span>
            <i className={`fas fa-chevron-right arrow ${openSections.comunicacion ? 'open' : ''}`}></i>
          </div>
          <div className={`submenu ${openSections.comunicacion ? 'open' : ''}`}>
            <Link 
              to="/admin/notificaciones" 
              className={`submenu-item ${isActive('/admin/notificaciones') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-bell"></i> {t('admin.notificaciones')}
            </Link>
            <Link 
              to="/admin/comentarios" 
              className={`submenu-item ${isActive('/admin/comentarios') ? 'active' : ''}`}
              onClick={closeAdminSidebar}
            >
              <i className="fas fa-comments"></i> {t('admin.comentarios')}
            </Link>
          </div>
        </div>
      </div>

      {/* Footer del menú */}
      <div className="menu-footer">
        <Link 
          to="/admin/configuracion" 
          className={`menu-item ${isActive('/admin/configuracion') ? 'active' : ''}`}
          onClick={closeAdminSidebar}
        >
          <i className="fas fa-cog"></i>
          <span>{t('admin.configuracion')}</span>
        </Link>
        
        <button 
          onClick={handleLogout}
          className="menu-item text-danger"
          style={{ 
            width: '100%', 
            textAlign: 'left', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            padding: '12px 20px'
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>{t('admin.cerrar_sesion')}</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminSidebar;