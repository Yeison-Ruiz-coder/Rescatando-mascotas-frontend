import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../services/api';
import './Mascotas.css';

const Mascotas = () => {
  const { t } = useTranslation();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        setLoading(true);
        console.log('🌐 Conectando a:', api.defaults.baseURL);
        
        const response = await api.get('/mascotas');
        console.log('✅ Respuesta completa:', response.data);
        
        // La estructura es: { success: true, data: { current_page: 1, data: [...], ... } }
        if (response.data.success) {
          // Los datos de las mascotas están en response.data.data.data
          const mascotasData = response.data.data.data || [];
          setMascotas(mascotasData);
          
          // Guardar info de paginación
          setPagination({
            currentPage: response.data.data.current_page,
            lastPage: response.data.data.last_page,
            total: response.data.data.total,
            perPage: response.data.data.per_page
          });
        }
        
        setError(null);
      } catch (err) {
        console.error('❌ Error:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMascotas();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando mascotas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error al cargar las mascotas</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="reload-btn">
          Reintentar
        </button>
      </div>
    );
  }

  if (mascotas.length === 0) {
    return (
      <div className="mascotas-container">
        <h1>{t('mascotas.title')}</h1>
        <p className="subtitle">No hay mascotas disponibles en este momento</p>
        {pagination && (
          <p className="info">Total registros: {pagination.total}</p>
        )}
      </div>
    );
  }

  return (
    <div className="mascotas-container">
      <h1>{t('mascotas.title')}</h1>
      <p className="subtitle">{t('mascotas.subtitle')}</p>
      
      {pagination && pagination.total > 0 && (
        <p className="info">Mostrando {mascotas.length} de {pagination.total} mascotas</p>
      )}
      
      <div className="mascotas-grid">
        {mascotas.map((mascota) => (
          <div key={mascota.id} className="mascota-card">
            <img 
              src={mascota.foto_principal ? 
                `http://rescatando-mascotas-forever.test/storage/${mascota.foto_principal}` : 
                'https://via.placeholder.com/300x200?text=Sin+Imagen'} 
              alt={mascota.nombre_mascota}
              className="mascota-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
              }}
            />
            <div className="mascota-info">
              <h3>{mascota.nombre_mascota}</h3>
              <p><strong>Especie:</strong> {mascota.especie || 'No especificada'}</p>
              <p><strong>Edad:</strong> {mascota.edad_aprox ? `${mascota.edad_aprox} años` : 'No disponible'}</p>
              <p><strong>Género:</strong> {mascota.genero || 'No especificado'}</p>
              <button 
                className="adopt-button"
                onClick={() => window.location.href = `/mascotas/${mascota.id}`}
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mascotas;