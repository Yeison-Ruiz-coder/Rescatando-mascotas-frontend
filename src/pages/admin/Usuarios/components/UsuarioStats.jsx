// pages/admin/Usuarios/components/UsuarioStats.jsx
import React from 'react';
import { Heart, ShoppingBag, AlertTriangle, Calendar, DollarSign, PawPrint } from 'lucide-react';

const UsuarioStats = ({ stats, tipo }) => {
  const statsConfig = {
    user: [
      { label: 'Adopciones', value: stats?.adopciones || 0, icon: Heart, color: 'text-pink-600', bg: 'bg-pink-100' },
      { label: 'Donaciones', value: `$${stats?.donaciones?.toLocaleString() || 0}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
      { label: 'Solicitudes', value: stats?.solicitudes || 0, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
      { label: 'Reportes', value: stats?.reportes || 0, icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-100' }
    ],
    fundacion: [
      { label: 'Mascotas', value: stats?.mascotas || 0, icon: PawPrint, color: 'text-purple-600', bg: 'bg-purple-100' },
      { label: 'Adopciones', value: stats?.adopciones || 0, icon: Heart, color: 'text-pink-600', bg: 'bg-pink-100' },
      { label: 'Donaciones Recibidas', value: `$${stats?.donaciones_recibidas?.toLocaleString() || 0}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
      { label: 'Solicitudes', value: stats?.solicitudes || 0, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' }
    ],
    veterinaria: [
      { label: 'Atenciones', value: stats?.atenciones || 0, icon: Heart, color: 'text-pink-600', bg: 'bg-pink-100' },
      { label: 'Historiales', value: stats?.historiales || 0, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
      { label: 'Productos', value: stats?.productos || 0, icon: ShoppingBag, color: 'text-orange-600', bg: 'bg-orange-100' },
      { label: 'Ventas', value: `$${stats?.ventas?.toLocaleString() || 0}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' }
    ],
    admin: [
      { label: 'Usuarios Gestionados', value: stats?.usuarios_gestionados || 0, icon: Heart, color: 'text-blue-600', bg: 'bg-blue-100' },
      { label: 'Reportes Revisados', value: stats?.reportes_revisados || 0, icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      { label: 'Acciones', value: stats?.acciones || 0, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' }
    ]
  };

  const config = statsConfig[tipo] || statsConfig.user;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {config.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-full`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UsuarioStats;