import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import MascotaCard from "./components/MascotaCard";
import MascotaFilters from "./components/MascotaFilters";
import adminMascotaService from "../../../services/adminMascotaService";
import "./AdminMascotas.css";

const AdminMascotas = () => {
  const { t } = useTranslation('admin');
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 15,
  });
  const [filters, setFilters] = useState({
    estado: "",
    especie: "",
    fundacion_id: "",
    buscar: "",
    page: 1
  });

  const cargarMascotas = async () => {
    setLoading(true);
    try {
      const response = await adminMascotaService.getMascotas(filters);
      
      if (response?.success) {
        const mascotasData = response?.data?.data || [];
        setMascotas(mascotasData);
        
        setPagination({
          current_page: response.data?.current_page || 1,
          last_page: response.data?.last_page || 1,
          total: response.data?.total || 0,
          per_page: response.data?.per_page || 15,
        });
      } else {
        setMascotas([]);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(t('mascotas.mensajes.error_cargar'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMascotas();
  }, [filters.estado, filters.especie, filters.fundacion_id, filters.buscar, filters.page]);

  const stats = {
    enAdopcion: mascotas.filter((m) => m.estado === "En adopcion").length,
    adoptados: mascotas.filter((m) => m.estado === "Adoptado").length,
    rescatados: mascotas.filter((m) => m.estado === "Rescatada").length,
    total: pagination.total,
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
  };

  return (
    <div className="admin-mascotas-container">
      {/* Header */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="mascotas-header text-center">
            <h1 className="display-5 fw-bold text-white">
              <i className="fas fa-paw me-3"></i>
              {t('mascotas.titulo')}
            </h1>
            <p className="lead text-white-50">
              {t('mascotas.subtitulo')}
            </p>
          </div>
        </div>
      </div>

      {/* Acciones Principales */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <Link to="/admin/mascotas/nueva" className="btn-nueva-mascota btn-lg">
              <i className="fas fa-plus-circle me-2"></i>
              {t('mascotas.nueva')}
            </Link>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <MascotaFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Estadísticas Rápidas */}
      {!filters.estado && !filters.especie && !filters.fundacion_id && !filters.buscar && (
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="stat-card bg-success text-white">
              <div className="stat-icon">
                <i className="fas fa-heart"></i>
              </div>
              <div className="stat-info">
                <h4>{stats.enAdopcion}</h4>
                <p>{t('mascotas.estadisticas.en_adopcion')}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="stat-card bg-info text-white">
              <div className="stat-icon">
                <i className="fas fa-home"></i>
              </div>
              <div className="stat-info">
                <h4>{stats.adoptados}</h4>
                <p>{t('mascotas.estadisticas.adoptados')}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="stat-card bg-warning text-dark">
              <div className="stat-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="stat-info">
                <h4>{stats.rescatados}</h4>
                <p>{t('mascotas.estadisticas.rescatados')}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="stat-card bg-secondary text-white">
              <div className="stat-icon">
                <i className="fas fa-paw"></i>
              </div>
              <div className="stat-info">
                <h4>{pagination.total}</h4>
                <p>{t('mascotas.estadisticas.total_sistema')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid de mascotas */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-light" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">{t('mascotas.mensajes.cargando')}</span>
          </div>
        </div>
      ) : mascotas.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-paw"></i>
          <h3>{t('mascotas.mensajes.no_encontradas')}</h3>
          <p>{t('mascotas.mensajes.ajustar_filtros')}</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
            <button
              onClick={() => handleFilterChange({ estado: "", especie: "", fundacion_id: "", buscar: "" })}
              className="btn btn-primary"
            >
              <i className="fas fa-redo me-2"></i>
              {t('mascotas.acciones.ver_todas')}
            </button>
            <Link to="/admin/mascotas/nueva" className="btn btn-success">
              <i className="fas fa-plus me-2"></i>
              {t('mascotas.acciones.crear_nueva')}
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="row">
            {mascotas.map((mascota) => (
              <div key={mascota.id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <MascotaCard mascota={mascota} />
              </div>
            ))}
          </div>

          {/* Paginación */}
          {pagination.last_page > 1 && (
            <div className="row mt-5">
              <div className="col-12">
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => handlePageChange(pagination.current_page - 1)}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                    </li>
                    
                    {[...Array(pagination.last_page).keys()].map(num => (
                      <li key={num + 1} className={`page-item ${pagination.current_page === num + 1 ? 'active' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => handlePageChange(num + 1)}
                        >
                          {num + 1}
                        </button>
                      </li>
                    ))}

                    <li className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => handlePageChange(pagination.current_page + 1)}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminMascotas;