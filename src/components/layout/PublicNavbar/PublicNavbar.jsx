import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import { useSidebar } from '../../../context/SidebarContext';
import './PublicNavbar.css';

const PublicNavbar = () => {
  const { t, i18n } = useTranslation('layout');
  const { isAuthenticated, user, logout } = useAuth();
  const { 
    toggleAdminSidebar, 
    togglePublicSidebar,
    isAdminSidebarOpen,
    isPublicSidebarOpen 
  } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.includes('/admin');

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determina qué sidebar está abierto según la ruta
  const isSidebarOpen = isAdminRoute ? isAdminSidebarOpen : isPublicSidebarOpen;
  const toggleSidebar = isAdminRoute ? toggleAdminSidebar : togglePublicSidebar;

  return (
    <nav className="public-navbar">
      <div className="public-navbar-container">
        {/* Botón hamburguesa - abre diferente sidebar según la ruta */}
        <button 
          className={`public-hamburger-btn ${isSidebarOpen ? 'open' : ''}`}
          onClick={toggleSidebar}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Logo y marca */}
        <Link to="/" className="public-navbar-brand">
          <img 
            src="/img/logo-oscuro.png" 
            alt="Logo Fundación" 
            className="public-navbar-logo"
          />
          <img 
            src="/img/texto-logo-oscuro.png" 
            alt="Rescatando Mascotas" 
            className="public-navbar-logo-texto"
          />
        </Link>

        {/* Botón de reporte urgente - SOLO EN PÚBLICO */}
        {!isAdminRoute && (
          <Link to="/rescates/crear" className="public-urgent-btn">
            <i className="fas fa-paw"></i>
            <span>{t('navbar.reportar_rescate')}</span>
          </Link>
        )}

        {/* BADGE DE ADMIN - SOLO PARA ADMINISTRADORES */}
        {isAuthenticated && user?.tipo === 'admin' && (
          <Link to="/admin/dashboard" className="admin-badge">
            <i className="fas fa-shield-alt"></i>
            <span>{t('admin.dashboard')}</span>
          </Link>
        )}

        {/* Perfil de usuario */}
        {isAuthenticated ? (
          <div className="public-profile-btn">
            <div className="public-profile-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" />
              ) : (
                <i className="fas fa-user"></i>
              )}
            </div>
            <div className="public-profile-info">
              <span className="public-profile-name">{user?.nombre}</span>
              <span className="public-profile-role">
                {user?.tipo === 'admin' ? t('navbar.administrador') : t('navbar.usuario')}
              </span>
            </div>
          </div>
        ) : (
          <Link to="/login" className="public-profile-btn">
            <div className="public-profile-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="public-profile-info">
              <span className="public-profile-name">{t('navbar.iniciar_sesion')}</span>
              <span className="public-profile-role">{t('navbar.registrarse')}</span>
            </div>
          </Link>
        )}

        {/* Selector de idioma con banderas */}
        <div className="language-selector-flags">
          <button
            onClick={() => toggleLanguage('es')}
            className={`language-flag-btn ${i18n.language === 'es' ? 'active' : ''}`}
            title="Español"
          >
            <span className="fi fi-co"></span>
            <span className="language-text">ES</span>
          </button>
          
          <button
            onClick={() => toggleLanguage('en')}
            className={`language-flag-btn ${i18n.language === 'en' ? 'active' : ''}`}
            title="English"
          >
            <span className="fi fi-us"></span>
            <span className="language-text">EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;