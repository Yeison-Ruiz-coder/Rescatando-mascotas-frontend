// pages/admin/Usuarios/UsuariosList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, Upload } from 'lucide-react';
import { useAdminUsuarios } from '../../../hooks/useAdmin';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ConfirmDialog from '../../../components/common/ConfirmDialog';
import UsuarioFilters from './components/UsuarioFilters';
import UsuarioTable from './components/UsuarioTable';

const UsuariosList = () => {
  const navigate = useNavigate();
  const {
    usuarios,
    loading,
    pagination,
    filters,
    handleFilterChange,
    handlePageChange,
    handleDelete,
    handleChangeEstado,
    handleVerifyEmail
  } = useAdminUsuarios();
  
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, usuario: null });
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const handleDeleteClick = (usuario) => {
    setDeleteConfirm({ open: true, usuario });
  };
  
  const confirmDelete = async () => {
    if (!deleteConfirm.usuario) return;
    setDeleteLoading(true);
    await handleDelete(deleteConfirm.usuario.id, deleteConfirm.usuario.nombre);
    setDeleteLoading(false);
    setDeleteConfirm({ open: false, usuario: null });
  };
  
  const handleEdit = (usuario) => {
    navigate(`/admin/usuarios/${usuario.id}/edit`);
  };
  
  const handleView = (id) => {
    navigate(`/admin/usuarios/${id}`);
  };
  
  const handleCreate = () => {
    navigate('/admin/usuarios/create');
  };
  
  // Calcular número de página para la paginación
  const totalPages = pagination.last_page || Math.ceil(pagination.total / pagination.per_page);
  
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-turquesa">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-1">Administra todos los usuarios de la plataforma</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-fucsia text-white rounded-lg hover:bg-fucsia-hover transition"
          >
            <Plus className="w-5 h-5" />
            Nuevo Usuario
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Usuarios</div>
          <div className="text-2xl font-bold text-turquesa">{pagination.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Usuarios Activos</div>
          <div className="text-2xl font-bold text-green-600">
            {usuarios.filter(u => u.estado === 'activo').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Fundaciones</div>
          <div className="text-2xl font-bold text-orange-600">
            {usuarios.filter(u => u.tipo === 'fundacion').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Veterinarias</div>
          <div className="text-2xl font-bold text-teal-600">
            {usuarios.filter(u => u.tipo === 'veterinaria').length}
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <UsuarioFilters filters={filters} onFilterChange={handleFilterChange} />
      
      {/* Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <UsuarioTable
            usuarios={usuarios}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onChangeEstado={handleChangeEstado}
            onVerifyEmail={handleVerifyEmail}
          />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Anterior
              </button>
              <span className="px-4 py-1">
                Página {pagination.current_page} de {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
      
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, usuario: null })}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title="Eliminar Usuario"
        message={`¿Estás seguro que deseas eliminar a ${deleteConfirm.usuario?.nombre}? Esta acción no se puede deshacer.`}
      />
    </div>
  );
};

export default UsuariosList;