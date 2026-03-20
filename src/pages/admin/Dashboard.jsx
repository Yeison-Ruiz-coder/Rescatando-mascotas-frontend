// pages/admin/Dashboard.jsx - Versión con diseño mejorado
import React, { useState, useEffect } from 'react';
import { 
  Users, PawPrint, Heart, DollarSign, TrendingUp, 
  Award, Calendar, Activity, ArrowUp, ArrowDown,
  ShoppingBag, Building2, MapPin, Clock
} from 'lucide-react';
import adminService from '../../services/adminService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [topDonations, setTopDonations] = useState([]);
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const fetchDashboardData = async () => {
    try {
      const [statsRes, donationsRes] = await Promise.all([
        adminService.getDashboard(),
        adminService.getReporteDonaciones()
      ]);
      setStats(statsRes.data);
      setTopDonations(donationsRes.data?.top_donaciones || []);
      
      // Actividad reciente simulada
      setRecentActivity([
        { id: 1, type: 'user', action: 'Nuevo usuario registrado', user: 'Carlos Pérez', time: 'Hace 5 min', icon: Users, color: '#48bb78' },
        { id: 2, type: 'adoption', action: 'Nueva adopción', user: 'Luna - Fundación Patitas', time: 'Hace 15 min', icon: Heart, color: '#f687b3' },
        { id: 3, type: 'donation', action: 'Donación recibida', user: 'María López - $50,000', time: 'Hace 1 hora', icon: DollarSign, color: '#9f7aea' },
        { id: 4, type: 'rescue', action: 'Reporte de rescate', user: 'Zona norte - Urgente', time: 'Hace 2 horas', icon: Activity, color: '#f56565' },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <LoadingSpinner />;
  
  const statCards = [
    { title: 'Usuarios', value: stats?.total_usuarios || 0, icon: Users, color: '#667eea', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', change: '+12%', trend: 'up' },
    { title: 'Mascotas', value: stats?.total_mascotas || 0, icon: PawPrint, color: '#ed8936', bg: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)', change: '+8%', trend: 'up' },
    { title: 'Adopciones', value: stats?.total_adopciones || 0, icon: Heart, color: '#f687b3', bg: 'linear-gradient(135deg, #f687b3 0%, #ed64a6 100%)', change: '+15%', trend: 'up' },
    { title: 'Donaciones', value: `$${stats?.total_donaciones?.toLocaleString() || 0}`, icon: DollarSign, color: '#48bb78', bg: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)', change: '+23%', trend: 'up' },
  ];
  
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
          Dashboard Administrativo
        </h1>
        <p style={{ color: '#718096', marginTop: '8px' }}>
          Bienvenido de vuelta, {JSON.parse(localStorage.getItem('user'))?.nombre}. Aquí está el resumen de tu plataforma.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: stat.bg,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon size={24} color="#fff" />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  background: stat.trend === 'up' ? '#e6fffa' : '#fff5f5',
                  borderRadius: '20px',
                }}>
                  {stat.trend === 'up' ? <ArrowUp size={14} color="#48bb78" /> : <ArrowDown size={14} color="#f56565" />}
                  <span style={{ fontSize: '12px', fontWeight: 500, color: stat.trend === 'up' ? '#48bb78' : '#f56565' }}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>{stat.title}</p>
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#2d3748', margin: '8px 0 0' }}>
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
      
      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Recent Activity */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Actividad Reciente</h3>
            <button style={{
              color: '#667eea',
              background: 'none',
              border: 'none',
              fontSize: '14px',
              cursor: 'pointer',
            }}>
              Ver todas
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivity.map(activity => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px',
                  borderRadius: '16px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f7fafc'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: `${activity.color}15`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon size={20} color={activity.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 500, margin: 0 }}>{activity.action}</p>
                    <p style={{ fontSize: '12px', color: '#718096', margin: '4px 0 0' }}>{activity.user}</p>
                  </div>
                  <span style={{ fontSize: '12px', color: '#a0aec0' }}>{activity.time}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Top Donations */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Donaciones Destacadas</h3>
            <Award size={20} color="#f6ad55" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {topDonations.slice(0, 5).map((donation, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: '#fed7d7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: '#c53030',
                }}>
                  {index + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: 500, margin: 0 }}>{donation.usuario_nombre}</p>
                  <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>{donation.fundacion_nombre}</p>
                </div>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#48bb78', margin: 0 }}>
                  ${donation.valor?.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        padding: '32px',
        color: '#fff',
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px 0' }}>
          Acciones Rápidas
        </h3>
        <p style={{ opacity: 0.9, marginBottom: '24px' }}>
          Gestiona rápidamente las tareas más comunes del sistema
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {[
            { icon: Heart, label: 'Gestionar Adopciones', color: '#fff' },
            { icon: PawPrint, label: 'Nueva Mascota', color: '#fff' },
            { icon: Users, label: 'Ver Solicitudes', color: '#fff' },
            { icon: ShoppingBag, label: 'Gestionar Tienda', color: '#fff' },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>
                <Icon size={18} />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;