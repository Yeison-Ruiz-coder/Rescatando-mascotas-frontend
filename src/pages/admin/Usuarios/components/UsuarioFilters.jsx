// pages/admin/Usuarios/components/UsuarioFilters.jsx
import React from 'react';

const UsuarioFilters = ({ filters, onFilterChange }) => {
  const tipos = [
    { value: '', label: 'Todos' },
    { value: 'admin', label: 'Administrador' },
    { value: 'user', label: 'Usuario' },
    { value: 'veterinaria', label: 'Veterinaria' },
    { value: 'fundacion', label: 'Fundación' }
  ];
  
  const estados = [
    { value: '', label: 'Todos' },
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' },
    { value: 'suspendido', label: 'Suspendido' },
    { value: 'pendiente', label: 'Pendiente' }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Nombre, email, documento..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-fucsia focus:border-fucsia"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select
            name="tipo"
            value={filters.tipo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-fucsia focus:border-fucsia"
          >
            {tipos.map(tipo => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            name="estado"
            value={filters.estado}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-fucsia focus:border-fucsia"
          >
            {estados.map(estado => (
              <option key={estado.value} value={estado.value}>
                {estado.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({ search: '', tipo: '', estado: '' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsuarioFilters;
