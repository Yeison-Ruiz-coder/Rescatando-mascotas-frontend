import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import { useSidebar } from '../../../context/SidebarContext';
import './PublicSidebar.css';

const PublicSidebar = () => {
  const { t } = useTranslation('layout');
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { isPublicSidebarOpen, closePublicSidebar } = useSidebar();

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    closePublicSidebar();
  };

  return (
    <aside className={`public-sidebar ${isPublicSidebarOpen ? 'open' : ''}`}>
      {/* Header del sidebar */}
      <div className="public-sidebar-header">
        <div className="public-sidebar-user">
          <div className="public-sidebar-avatar">
            <i className="fas fa-user"></i>
          </div>
          <div className="public-sidebar-user-info">
            <h5>{isAuthenticated ? user?.nombre : t('navbar.invitado')}</h5>
            <span className="public-sidebar-user-role">{t('navbar.bienvenido')}</span>
          </div>
        </div>
        <button className="public-sidebar-close" onClick={closePublicSidebar}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Navegación */}
      <nav className="public-sidebar-nav">
        {/* ACCIONES PRINCIPALES */}
        <div className="public-sidebar-section">
          <div className="public-section-title">
            {t('sidebar.acciones_principales')}
          </div>
          <Link 
            to="/rescates/reportar" 
            className={`public-sidebar-item public-rescate-item ${isActive('/rescates/reportar') ? 'active' : ''}`}
            onClick={closePublicSidebar}
          >
            <i className="fas fa-exclamation-triangle"></i>
            <span>{t('sidebar.reportar_emergencia')}</span>
            <span className="public-sidebar-badge">URGENTE</span>
          </Link>

          <Link 
            to="/rescates/activos" 
            className={`public-sidebar-item ${isActive('/rescates/activos') ? 'active' : ''}`}
            onClick={closePublicSidebar}
          >
            <i className="fas fa-map-marker-alt"></i>
            <span>{t('sidebar.rescates_activos')}</span>
          </Link>
        </div>

        {/* ADOPCIÓN */}
        <div className="public-sidebar-section">
          <div className="public-section-title">
            <i className="fas fa-dog me-1"></i> {t('sidebar.adopcion')}
          </div>

          <Link 
            to="/adopciones" 
            className={`public-sidebar-item ${isActive('/adopciones') ? 'active' : ''}`}
            onClick={closePublicSidebar}
          >
            <i className="fas fa-paw"></i>
            <span>{t('sidebar.mascotas_adopcion')}</span>
          </Link>

          {isAuthenticated && (
            <Link 
              to="/mis-solicitudes" 
              className={`public-sidebar-item ${isActive('/mis-solicitudes') ? 'active' : ''}`}
              onClick={closePublicSidebar}
            >
              <i className="fas fa-clipboard-list"></i>
              <span>{t('sidebar.mis_solicitudes')}</span>
            </Link>
          )}

          <Link 
            to="/apadrinamientos" 
            className={`public-sidebar-item ${isActive('/apadrinamientos') ? 'active' : ''}`}
            onClick={closePublicSidebar}
          >
            <i className="fas fa-heart"></i>
            <span>{t('sidebar.apadrinar')}</span>
          </Link>
        </div>

        {/* COLABORAR */}
        <div className="public-sidebar-section">
          <div className="public-section-title">
            <i className="fas fa-hand-holding-heart me-1"></i> {t('sidebar.colaborar')}
          </div>

          <Link 
            to="/donaciones" 
            className={`public-sidebar-item ${isActive('/donaciones') ? 'active' : ''}`}
            onClick={closePublicSidebar}
          >
            <i className="fas fa-donate"></i>
            <span>{t('sidebar.donar')}</span>
          </Link>

          <Link 
            to="/eventos" 
            className={`public-sidebar-item ${isActive('/eventos') ? 'active' : ''}`}
            onClick={closePublicSidebar}
          >
            <i className="fas fa-calendar-alt"></i>
            <span>{t('sidebar.eventos')}</span>
          </Link>
        </div>

        {/* COMUNIDAD */}
        <div className="public-sidebar-section">
          <div className="public-section-title">
            <i className="fas fa-users me-1"></i> {t('sidebar.comunidad')}
          </div>

          <Link 
            to="/fundaciones" 
            className={`public-sidebar-item ${isActive('/fundaciones') ? 'active' : ''}`}
            onClick={closePublicSidebar}
          >
            <i className="fas fa-building"></i>
            <span>{t('sidebar.fundaciones')}</span>
          </Link>

          <Link 
            to="/veterinarias" 
            className={`public-sidebar-item ${isActive('/veterinarias') ? 'active' : ''}`}
            onClick={closePublicSidebar}
          >
            <i className="fas fa-clinic-medical"></i>
            <span>{t('sidebar.veterinarias')}</span>
          </Link>
        </div>
      </nav>

      {/* Footer del sidebar */}
      <div className="public-sidebar-footer">
        {isAuthenticated && (
          <Link to="/perfil" className="public-sidebar-item" onClick={closePublicSidebar}>
            <i className="fas fa-user-circle"></i>
            <span>{t('navbar.mi_perfil')}</span>
          </Link>
        )}

        <Link to="/notificaciones" className="public-sidebar-item" onClick={closePublicSidebar}>
          <i className="fas fa-bell"></i>
          <span>{t('sidebar.notificaciones')}</span>
          <span className="public-sidebar-badge">3</span>
        </Link>

        <Link to="/faq" className="public-sidebar-item" onClick={closePublicSidebar}>
          <i className="fas fa-question-circle"></i>
          <span>{t('sidebar.ayuda')}</span>
        </Link>

        {isAuthenticated && (
          <button 
            onClick={handleLogout}
            className="public-sidebar-item text-danger"
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>{t('navbar.cerrar_sesion')}</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default PublicSidebar;