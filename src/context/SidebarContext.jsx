import React, { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar debe usarse dentro de SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({ children }) => {
  // Sidebar para admin
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  
  // Sidebar para público
  const [isPublicSidebarOpen, setIsPublicSidebarOpen] = useState(false);

  // Funciones para admin sidebar
  const toggleAdminSidebar = () => {
    setIsAdminSidebarOpen(!isAdminSidebarOpen);
    // Si abres admin, cierra público
    if (!isAdminSidebarOpen) setIsPublicSidebarOpen(false);
  };

  const closeAdminSidebar = () => {
    setIsAdminSidebarOpen(false);
  };

  // Funciones para public sidebar
  const togglePublicSidebar = () => {
    setIsPublicSidebarOpen(!isPublicSidebarOpen);
    // Si abres público, cierra admin
    if (!isPublicSidebarOpen) setIsAdminSidebarOpen(false);
  };

  const closePublicSidebar = () => {
    setIsPublicSidebarOpen(false);
  };

  // Cerrar ambos
  const closeAllSidebars = () => {
    setIsAdminSidebarOpen(false);
    setIsPublicSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider value={{
      // Admin sidebar
      isAdminSidebarOpen,
      toggleAdminSidebar,
      closeAdminSidebar,
      
      // Public sidebar
      isPublicSidebarOpen,
      togglePublicSidebar,
      closePublicSidebar,
      
      // Utilidades
      closeAllSidebars
    }}>
      {children}
    </SidebarContext.Provider>
  );
};