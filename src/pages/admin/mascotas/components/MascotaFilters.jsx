import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import adminService from "../../../../services/adminService";

const MascotaFilters = ({ filters, onFilterChange }) => {
  const { t } = useTranslation('admin');
  const [localFilters, setLocalFilters] = useState(filters);
  const [fundaciones, setFundaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarFundaciones();
  }, []);

  const cargarFundaciones = async () => {
    setLoading(true);
    try {
      const response = await adminService.getFundaciones();
      if (response && response.success) {
        const fundacionesData = Array.isArray(response.data) ? response.data : [];
        setFundaciones(fundacionesData);
      } else {
        setFundaciones([]);
      }
    } catch (error) {
      console.error("Error cargando fundaciones:", error);
      setFundaciones([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      estado: "",
      especie: "",
      fundacion_id: "",
      buscar: "",
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="card filtros-card mb-4">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Buscar Mascotas */}
            <div className="col-md-3">
              <label className="form-label">
                <i className="fas fa-search me-2"></i>
                {t('mascotas.filtros.buscar')}
              </label>
              <input
                type="text"
                className="form-control"
                name="buscar"
                value={localFilters.buscar || ""}
                onChange={handleInputChange}
                placeholder={t('mascotas.filtros.buscar_placeholder')}
              />
            </div>

            {/* Especie */}
            <div className="col-md-2">
              <label className="form-label">
                <i className="fas fa-paw me-2"></i>
                {t('mascotas.filtros.especie')}
              </label>
              <select
                className="form-select"
                name="especie"
                value={localFilters.especie || ""}
                onChange={handleInputChange}
              >
                <option value="">{t('mascotas.filtros.todas_especies')}</option>
                <option value="Perro">{t('nueva_mascota.opciones.perro')}</option>
                <option value="Gato">{t('nueva_mascota.opciones.gato')}</option>
                <option value="Conejo">{t('nueva_mascota.opciones.conejo')}</option>
                <option value="Otro">{t('nueva_mascota.opciones.otro')}</option>
              </select>
            </div>

            {/* Estado */}
            <div className="col-md-2">
              <label className="form-label">
                <i className="fas fa-heart me-2"></i>
                {t('mascotas.filtros.estado')}
              </label>
              <select
                className="form-select"
                name="estado"
                value={localFilters.estado || ""}
                onChange={handleInputChange}
              >
                <option value="">{t('mascotas.filtros.todos_estados')}</option>
                <option value="En adopcion">{t('nueva_mascota.opciones.en_adopcion')}</option>
                <option value="Adoptado">{t('nueva_mascota.opciones.adoptado')}</option>
                <option value="Rescatada">{t('nueva_mascota.opciones.rescatada')}</option>
                <option value="En acogida">{t('nueva_mascota.opciones.en_acogida')}</option>
              </select>
            </div>

            {/* Fundación */}
            <div className="col-md-2">
              <label className="form-label">
                <i className="fas fa-building me-2"></i>
                {t('mascotas.filtros.fundacion')}
              </label>
              <select
                className="form-select"
                name="fundacion_id"
                value={localFilters.fundacion_id || ""}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="">{t('mascotas.filtros.todas_fundaciones')}</option>
                {fundaciones && fundaciones.length > 0 ? (
                  fundaciones.map((fundacion) => (
                    <option key={fundacion.id} value={fundacion.id}>
                      {fundacion.Nombre_1 || fundacion.nombre || "Sin nombre"}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>Cargando...</option>
                )}
              </select>
            </div>

            {/* Botones */}
            <div className="col-md-3 d-flex align-items-end">
              <div className="d-flex gap-2 w-100">
                <button type="submit" className="btn btn-filtrar flex-fill">
                  <i className="fas fa-search me-2"></i>
                  {t('mascotas.filtros.filtrar')}
                </button>
                <button
                  type="button"
                  className="btn btn-limpiar"
                  onClick={handleReset}
                  title={t('mascotas.filtros.limpiar')}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MascotaFilters;