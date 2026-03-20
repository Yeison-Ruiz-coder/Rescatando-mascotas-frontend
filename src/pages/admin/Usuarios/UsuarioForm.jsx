// pages/admin/Usuarios/UsuarioForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import adminService from '../../../services/adminService';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { toast } from 'react-toastify';

const UsuarioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    password_confirmation: '',
    tipo: 'user',
    estado: 'activo',
    fecha_nacimiento: '',
    direccion: '',
    telefono: '',
    tipo_documento: '',
    numero_documento: '',
    avatar: null
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      fetchUsuario();
    }
  }, [id]);

  const fetchUsuario = async () => {
    setLoading(true);
    try {
      const response = await adminService.getUsuario(id);
      const usuario = response.data;
      setFormData({
        nombre: usuario.nombre || '',
        apellidos: usuario.apellidos || '',
        email: usuario.email || '',
        password: '',
        password_confirmation: '',
        tipo: usuario.tipo || 'user',
        estado: usuario.estado || 'activo',
        fecha_nacimiento: usuario.fecha_nacimiento || '',
        direccion: usuario.direccion || '',
        telefono: usuario.telefono || '',
        tipo_documento: usuario.tipo_documento || '',
        numero_documento: usuario.numero_documento || '',
        avatar: null
      });
      if (usuario.avatar) {
        setAvatarPreview(`/storage/${usuario.avatar}`);
      }
    } catch (error) {
      console.error('Error fetching usuario:', error);
      toast.error('Error al cargar los datos del usuario');
      navigate('/admin/usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setAvatarPreview(null);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      // Limpiar error del campo
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!isEditing && !formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    
    try {
      const dataToSend = { ...formData };
      if (!isEditing) {
        // Crear nuevo usuario
        await adminService.createUsuario(dataToSend);
        toast.success('Usuario creado exitosamente');
      } else {
        // Actualizar usuario existente
        // Si no se proporcionó nueva contraseña, la eliminamos
        if (!dataToSend.password) {
          delete dataToSend.password;
          delete dataToSend.password_confirmation;
        }
        await adminService.updateUsuario(id, dataToSend);
        toast.success('Usuario actualizado exitosamente');
      }
      navigate('/admin/usuarios');
    } catch (error) {
      console.error('Error saving usuario:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(error.response?.data?.message || 'Error al guardar el usuario');
      }
    } finally {
      setSaving(false);
    }
  };

  const tipos = [
    { value: 'admin', label: 'Administrador' },
    { value: 'user', label: 'Usuario' },
    { value: 'veterinaria', label: 'Veterinaria' },
    { value: 'fundacion', label: 'Fundación' }
  ];

  const estados = [
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' },
    { value: 'suspendido', label: 'Suspendido' },
    { value: 'pendiente', label: 'Pendiente' }
  ];

  const tiposDocumento = [
    { value: 'CC', label: 'Cédula de Ciudadanía' },
    { value: 'NIT', label: 'NIT' },
    { value: 'CE', label: 'Cédula de Extranjería' },
    { value: 'Pasaporte', label: 'Pasaporte' }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <LoadingSpinner />
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-turquesa">
              {isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing ? 'Modifica los datos del usuario' : 'Crea un nuevo usuario en el sistema'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={avatarPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.nombre || 'User')}&background=764ba2&color=fff&bold=true&size=100`}
                alt="Avatar preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
              <label className="absolute bottom-0 right-0 p-1 bg-fucsia rounded-full cursor-pointer hover:bg-fucsia-hover transition">
                <Upload className="w-4 h-4 text-white" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="text-sm text-gray-500">
              <p>Formatos permitidos: JPG, PNG, GIF</p>
              <p>Tamaño máximo: 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-fucsia focus:border-fucsia ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.nombre && (
                <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
              )}
            </div>

            {/* Apellidos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellidos
              </label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-fucsia focus:border-fucsia"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-fucsia focus:border-fucsia ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-fucsia focus:border-fucsia"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Usuario
              </label>
              <select
                name="tipo"
                value={formData.tipo}
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

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                name="estado"
                value={formData.estado}
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

            {/* Fecha de Nacimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-fucsia focus:border-fucsia"
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-fucsia focus:border-fucsia"
              />
            </div>

            {/* Tipo de Documento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Documento
              </label>
              <select
                name="tipo_documento"
                value={formData.tipo_documento}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-fucsia focus:border-fucsia"
              >
                <option value="">Seleccionar</option>
                {tiposDocumento.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Número de Documento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Documento
              </label>
              <input
                type="text"
                name="numero_documento"
                value={formData.numero_documento}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-fucsia focus:border-fucsia"
              />
              {errors.numero_documento && (
                <p className="mt-1 text-sm text-red-500">{errors.numero_documento}</p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEditing ? 'Nueva Contraseña (dejar vacío para mantener)' : 'Contraseña'} 
                {!isEditing && <span className="text-red-500">*</span>}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-fucsia focus:border-fucsia ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-fucsia focus:border-fucsia ${
                  errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-500">{errors.password_confirmation}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <Link
            to="/admin/usuarios"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-fucsia text-white rounded-lg hover:bg-fucsia-hover transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear Usuario')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsuarioForm;