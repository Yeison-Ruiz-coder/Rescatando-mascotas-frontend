// pages/admin/Usuarios/UsuarioDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, User, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import adminService from '../../../services/adminService';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ConfirmDialog from '../../../components/common/ConfirmDialog';
import UsuarioStats from './components/UsuarioStats';
import { toast } from 'react-toastify';

const UsuarioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchUsuario();
  }, [id]);

  const fetchUsuario = async () => {
    setLoading(true);
    try {
      const response = await adminService.getUsuario(id);
      setUsuario(response.data);
      // Cargar estadísticas del usuario
      const statsResponse = await adminService.getEstadisticasGenerales();
      setStats({
        adopciones: response.data.adopciones_count || 0,
        donaciones: response.data.donaciones_total || 0,
        solicitudes: response.data.solicitudes_count || 0,
        reportes: response.data.reportes_count || 0,
        mascotas: response.data.mascotas_count || 0,
        ...statsResponse?.data
      });
    } catch (error) {
      console.error('Error fetching usuario:', error);
      toast.error('Error al cargar los datos del usuario');
      navigate('/admin/usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await adminService.deleteUsuario(id);
      toast.success('Usuario eliminado correctamente');
      navigate('/admin/usuarios');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar usuario');
    } finally {
      setDeleteLoading(false);
      setDeleteConfirm(false);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      await adminService.verificarEmailUsuario(id);
      toast.success('Email verificado correctamente');
      fetchUsuario();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al verificar email');
    }
  };

  const handleChangeEstado = async (nuevoEstado) => {
    try {
      await adminService.cambiarEstadoUsuario(id, nuevoEstado);
      toast.success('Estado actualizado correctamente');
      fetchUsuario();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al cambiar estado');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Usuario no encontrado</p>
        <Link to="/admin/usuarios" className="text-fucsia hover:underline mt-2 inline-block">
          Volver a la lista
        </Link>
      </div>
    );
  }

  const getAvatarUrl = () => {
    if (!usuario.avatar) return `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nombre)}&background=764ba2&color=fff&bold=true&size=150`;
    if (usuario.avatar.startsWith('http')) return usuario.avatar;
    return `/storage/${usuario.avatar}`;
  };

  const getEstadoBadge = () => {
    const config = {
      activo: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Activo' },
      inactivo: { color: 'bg-gray-100 text-gray-800', icon: XCircle, text: 'Inactivo' },
      suspendido: { color: 'bg-red-100 text-red-800', icon: XCircle, text: 'Suspendido' },
      pendiente: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Pendiente' }
    };
    const { color, icon: Icon, text } = config[usuario.estado] || config.pendiente;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {text}
      </span>
    );
  };

  const getTipoBadge = () => {
    const config = {
      admin: 'bg-purple-100 text-purple-800',
      user: 'bg-blue-100 text-blue-800',
      veterinaria: 'bg-teal-100 text-teal-800',
      fundacion: 'bg-orange-100 text-orange-800'
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config[usuario.tipo] || config.user}`}>
        {usuario.tipo === 'admin' ? 'Administrador' : 
         usuario.tipo === 'veterinaria' ? 'Veterinaria' : 
         usuario.tipo === 'fundacion' ? 'Fundación' : 'Usuario'}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/usuarios"
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-turquesa">Detalle de Usuario</h1>
            <p className="text-gray-600 mt-1">Información completa del usuario</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/admin/usuarios/${id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Edit className="w-4 h-4" />
            Editar
          </Link>
          <button
            onClick={() => setDeleteConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>

      {/* Stats */}
      <UsuarioStats stats={stats} tipo={usuario.tipo} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gradient-to-r from-turquesa to-fucsia p-6 text-center">
              <img
                src={getAvatarUrl()}
                alt={usuario.nombre}
                className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
              />
              <h2 className="text-xl font-bold text-white mt-4">
                {usuario.nombre} {usuario.apellidos}
              </h2>
              <div className="flex justify-center gap-2 mt-2">
                {getTipoBadge()}
                {getEstadoBadge()}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-fucsia" />
                <span>{usuario.email}</span>
                {usuario.email_verified_at ? (
                  <span className="text-xs text-green-600 ml-auto">Verificado</span>
                ) : (
                  <button
                    onClick={handleVerifyEmail}
                    className="text-xs text-yellow-600 hover:text-yellow-800 ml-auto"
                  >
                    Verificar
                  </button>
                )}
              </div>
              {usuario.telefono && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-fucsia" />
                  <span>{usuario.telefono}</span>
                </div>
              )}
              {usuario.direccion && (
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-fucsia" />
                  <span>{usuario.direccion}</span>
                </div>
              )}
              {usuario.fecha_nacimiento && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-fucsia" />
                  <span>{new Date(usuario.fecha_nacimiento).toLocaleDateString('es-ES')}</span>
                </div>
              )}
              {usuario.numero_documento && (
                <div className="flex items-center gap-3 text-gray-600">
                  <User className="w-5 h-5 text-fucsia" />
                  <span>{usuario.tipo_documento || 'Documento'}: {usuario.numero_documento}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información de la cuenta */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Información de la Cuenta</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">ID de Usuario</p>
                <p className="font-medium">#{usuario.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha de Registro</p>
                <p className="font-medium">{new Date(usuario.created_at).toLocaleDateString('es-ES')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Última Actualización</p>
                <p className="font-medium">{new Date(usuario.updated_at).toLocaleDateString('es-ES')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estado</p>
                <select
                  value={usuario.estado}
                  onChange={(e) => handleChangeEstado(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-fucsia focus:border-fucsia sm:text-sm rounded-md"
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="suspendido">Suspendido</option>
                  <option value="pendiente">Pendiente</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actividad Reciente - Placeholder */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Actividad Reciente</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-center">No hay actividad reciente para mostrar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Eliminar Usuario"
        message={`¿Estás seguro que deseas eliminar a ${usuario.nombre} ${usuario.apellidos || ''}? Esta acción no se puede deshacer.`}
      />
    </div>
  );
};

export default UsuarioDetail;