import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import router from './routes';
// import './App.css';  // <-- COMENTAR O ELIMINAR ESTA LÍNEA

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;