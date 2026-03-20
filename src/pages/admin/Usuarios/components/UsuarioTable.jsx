// pages/admin/Usuarios/components/UsuarioTable.jsx
import React, { useState } from 'react';
import { Eye, Edit, Trash2, CheckCircle, XCircle, Clock, UserCheck } from 'lucide-react';

const EstadoBadge = ({ estado }) => {
  const config = {
    activo: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    inactivo: { color: 'bg-gray-100 text-gray-800', icon: XCircle },
    suspendido: { color: 'bg-red-100 text-red-800', icon: XCircle },
    pendiente: { color: 'bg-yellow-100 text-yellow-800', icon: Clock }
  };
  
  const { color, icon: Icon } = config[estado] || config.pendiente;
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {estado}
    </span>
  );
};

const TipoBadge = ({ tipo }) => {
  const config = {
    admin: 'bg-purple-100 text-purple-800',
    user: 'bg-blue-100 text-blue-800',
    veterinaria: 'bg-teal-100 text-teal-800',
    fundacion: 'bg-orange-100 text-orange-800'
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config[tipo] || config.user}`}>
      {tipo}
    </span>
  );
};

const UsuarioTable = ({ usuarios, onView, onEdit, onDelete, onChangeEstado, onVerifyEmail }) => {
  const [deleteId, setDeleteId] = useState(null);
  
  const getAvatarUrl = (avatar) => {
    if (!avatar) return 'https://ui-avatars.com/api/?background=764ba2&color=fff&bold=true';
    if (avatar.startsWith('http')) return avatar;
    return `/storage/${avatar}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Verificado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={getAvatarUrl(usuario.avatar)}
                        alt={usuario.nombre}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {usuario.nombre} {usuario.apellidos}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {usuario.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{usuario.email}</div>
                  <div className="text-sm text-gray-500">{usuario.telefono || 'Sin teléfono'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TipoBadge tipo={usuario.tipo} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <EstadoBadge estado={usuario.estado} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {usuario.email_verified_at ? (
                    <span className="inline-flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verificado
                    </span>
                  ) : (
                    <button
                      onClick={() => onVerifyEmail(usuario.id)}
                      className="inline-flex items-center text-yellow-600 hover:text-yellow-800"
                    >
                      <UserCheck className="w-4 h-4 mr-1" />
                      Verificar
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onView(usuario.id)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Ver detalles"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onEdit(usuario)}
                      className="text-green-600 hover:text-green-900 p-1"
                      title="Editar"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <select
                      value={usuario.estado}
                      onChange={(e) => onChangeEstado(usuario.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                      <option value="suspendido">Suspendido</option>
                      <option value="pendiente">Pendiente</option>
                    </select>
                    <button
                      onClick={() => onDelete(usuario)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuarioTable;