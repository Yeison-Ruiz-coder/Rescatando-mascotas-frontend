import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import adminMascotaService from "../../../services/adminMascotaService";
import adminService from "../../../services/adminService";
import SelectModerno from "../../../components/common/SelectModerno/SelectModerno";
import "./AdminMascotasNueva.css";

const AdminMascotasNueva = () => {
  const { t } = useTranslation('admin');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [razas, setRazas] = useState([]);
  const [vacunas, setVacunas] = useState([]);
  const [fundaciones, setFundaciones] = useState([]);

  const [formData, setFormData] = useState({
    nombre_mascota: "",
    especie: "",
    razas: [],
    edad_aprox: "",
    genero: "",
    estado: "En adopcion",
    lugar_rescate: "",
    descripcion: "",
    condiciones_especiales: "",
    necesita_hogar_temporal: false,
    apto_con_ninos: true,
    apto_con_otros_animales: true,
    vacunas: [],
    foto_principal: null,
    galeria_fotos: [],
    fecha_ingreso: new Date().toISOString().split("T")[0],
    fecha_salida: "",
    fundacion_id: "",
  });

  const [fotoPrincipalPreview, setFotoPrincipalPreview] = useState(null);
  const [galeriaPreviews, setGaleriaPreviews] = useState([]);

  useEffect(() => {
    cargarDatosSelects();
  }, []);

  const cargarDatosSelects = async () => {
    setLoading(true);
    try {
      const [razasRes, vacunasRes, fundacionesRes] = await Promise.all([
        adminService.getRazas(),
        adminService.getVacunas(),
        adminService.getFundaciones(),
      ]);

      if (razasRes?.success) {
        const razasData = razasRes.data?.data || [];
        setRazas(Array.isArray(razasData) ? razasData : []);
      }

      if (vacunasRes?.success) {
        const vacunasData = vacunasRes.data?.data || [];
        setVacunas(Array.isArray(vacunasData) ? vacunasData : []);
      }

      if (fundacionesRes?.success) {
        const fundacionesData = fundacionesRes.data?.data || [];
        setFundaciones(Array.isArray(fundacionesData) ? fundacionesData : []);
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
      alert(t('nueva_mascota.mensajes.error_crear'));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "foto_principal" && files[0]) {
      const file = files[0];

      if (file.size > 2 * 1024 * 1024) {
        alert(t('nueva_mascota.mensajes.imagen_muy_grande'));
        e.target.value = "";
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert(t('nueva_mascota.mensajes.archivo_invalido'));
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({ ...prev, foto_principal: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPrincipalPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

    if (name === "galeria_fotos") {
      const filesArray = Array.from(files);
      let validFiles = [];
      
      for (let file of filesArray) {
        if (file.size > 2 * 1024 * 1024) {
          alert(`"${file.name}" ${t('nueva_mascota.mensajes.imagen_muy_grande')}`);
          continue;
        }
        if (!file.type.startsWith("image/")) {
          alert(`"${file.name}" ${t('nueva_mascota.mensajes.archivo_invalido')}`);
          continue;
        }
        validFiles.push(file);
      }

      setFormData((prev) => ({ ...prev, galeria_fotos: validFiles }));

      const previews = [];
      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === validFiles.length) {
            setGaleriaPreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeFotoPrincipal = () => {
    setFormData((prev) => ({ ...prev, foto_principal: null }));
    setFotoPrincipalPreview(null);
    document.getElementById("foto_principal").value = "";
  };

  const removeFotoGaleria = (index) => {
    const newFiles = Array.from(formData.galeria_fotos).filter((_, i) => i !== index);
    const newPreviews = galeriaPreviews.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, galeria_fotos: newFiles }));
    setGaleriaPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!formData.foto_principal) {
        alert(t('nueva_mascota.mensajes.foto_obligatoria'));
        setSubmitting(false);
        return;
      }

      const formDataToSend = new FormData();

      formDataToSend.append("nombre_mascota", formData.nombre_mascota);
      formDataToSend.append("especie", formData.especie);
      formDataToSend.append("edad_aprox", formData.edad_aprox);
      formDataToSend.append("genero", formData.genero);
      formDataToSend.append("estado", formData.estado);
      formDataToSend.append("lugar_rescate", formData.lugar_rescate);
      formDataToSend.append("descripcion", formData.descripcion);
      formDataToSend.append("condiciones_especiales", formData.condiciones_especiales || "");
      formDataToSend.append("fecha_ingreso", formData.fecha_ingreso);
      if (formData.fecha_salida) formDataToSend.append("fecha_salida", formData.fecha_salida);
      formDataToSend.append("fundacion_id", formData.fundacion_id);

      formDataToSend.append("necesita_hogar_temporal", formData.necesita_hogar_temporal ? "1" : "0");
      formDataToSend.append("apto_con_ninos", formData.apto_con_ninos ? "1" : "0");
      formDataToSend.append("apto_con_otros_animales", formData.apto_con_otros_animales ? "1" : "0");

      formData.razas.forEach((id) => formDataToSend.append("razas[]", id));
      formData.vacunas.forEach((id) => formDataToSend.append("vacunas[]", id));

      formDataToSend.append("foto_principal", formData.foto_principal);
      formData.galeria_fotos.forEach((file) => formDataToSend.append("galeria_fotos[]", file));

      const response = await adminMascotaService.createMascota(formDataToSend);

      if (response.success) {
        alert(t('nueva_mascota.mensajes.creada_exito'));
        navigate("/admin/mascotas");
      } else {
        alert(t('nueva_mascota.mensajes.error_crear') + ": " + (response.message || ""));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(t('nueva_mascota.mensajes.error_crear'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t('mascotas.mensajes.cargando')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-mascotas-nueva-container">
      <div className="row mb-5">
        <div className="col-12">
          <div className="create-mascota-header text-center">
            <h1 className="display-5 fw-bold">
              <i className="fas fa-paw me-3"></i>{t('nueva_mascota.titulo')}
            </h1>
            <p className="lead">{t('nueva_mascota.subtitulo')}</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="card form-mascota-card shadow-lg border-0">
            <div className="card-header form-mascota-header">
              <h3 className="mb-0">
                <i className="fas fa-plus-circle me-2"></i>{t('nueva_mascota.formulario')}
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Sección 1: Información Básica */}
                <div className="form-section">
                  <h4 className="section-title">
                    <i className="fas fa-info-circle me-2"></i>{t('nueva_mascota.secciones.info_basica')}
                  </h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        {t('nueva_mascota.campos.nombre')} <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        name="nombre_mascota"
                        value={formData.nombre_mascota}
                        onChange={handleInputChange}
                        placeholder={t('nueva_mascota.placeholders.nombre')}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <SelectModerno
                        label={t('nueva_mascota.campos.especie')}
                        required
                        options={[
                          { value: "Perro", label: t('nueva_mascota.opciones.perro') },
                          { value: "Gato", label: t('nueva_mascota.opciones.gato') },
                          { value: "Conejo", label: t('nueva_mascota.opciones.conejo') },
                          { value: "Otro", label: t('nueva_mascota.opciones.otro') },
                        ]}
                        value={formData.especie ? [formData.especie] : []}
                        onChange={(selected) =>
                          setFormData({ ...formData, especie: selected[0] || "" })
                        }
                        isMulti={false}
                        placeholder={t('nueva_mascota.opciones.selecciona_especie')}
                      />
                    </div>

                    <SelectModerno
                      label={t('nueva_mascota.campos.razas')}
                      required
                      options={razas.map((raza) => ({
                        value: raza.id,
                        label: raza.nombre_raza,
                        subLabel: raza.especie,
                      }))}
                      value={formData.razas}
                      onChange={(selected) => setFormData({ ...formData, razas: selected })}
                      isMulti={true}
                      helpText={t('nueva_mascota.help.ctrl_multiple')}
                    />

                    <div className="col-md-6">
                      <label className="form-label">
                        {t('nueva_mascota.campos.edad')} <span className="required">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-custom"
                        name="edad_aprox"
                        value={formData.edad_aprox}
                        onChange={handleInputChange}
                        min="0"
                        max="30"
                        step="0.5"
                        placeholder={t('nueva_mascota.placeholders.edad')}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">{t('nueva_mascota.campos.genero')} <span className="required">*</span></label>
                      <div className="radio-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="genero"
                            id="genero_macho"
                            value="Macho"
                            checked={formData.genero === "Macho"}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="form-check-label" htmlFor="genero_macho">
                            <i className="fas fa-mars me-1"></i>{t('nueva_mascota.opciones.macho')}
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="genero"
                            id="genero_hembra"
                            value="Hembra"
                            checked={formData.genero === "Hembra"}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="genero_hembra">
                            <i className="fas fa-venus me-1"></i>{t('nueva_mascota.opciones.hembra')}
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="genero"
                            id="genero_desconocido"
                            value="Desconocido"
                            checked={formData.genero === "Desconocido"}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="genero_desconocido">
                            <i className="fas fa-question me-1"></i>{t('nueva_mascota.opciones.desconocido')}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <SelectModerno
                        label={t('nueva_mascota.campos.estado')}
                        required
                        options={[
                          { value: "En adopcion", label: t('nueva_mascota.opciones.en_adopcion') },
                          { value: "Rescatada", label: t('nueva_mascota.opciones.rescatada') },
                          { value: "En acogida", label: t('nueva_mascota.opciones.en_acogida') },
                          { value: "Adoptado", label: t('nueva_mascota.opciones.adoptado') },
                        ]}
                        value={formData.estado ? [formData.estado] : []}
                        onChange={(selected) =>
                          setFormData({ ...formData, estado: selected[0] || "En adopcion" })
                        }
                        isMulti={false}
                        placeholder={t('nueva_mascota.opciones.selecciona_estado')}
                      />
                    </div>
                  </div>
                </div>

                {/* Sección 2: Ubicación y Descripción */}
                <div className="form-section">
                  <h4 className="section-title">
                    <i className="fas fa-map-marker-alt me-2"></i>{t('nueva_mascota.secciones.ubicacion_descripcion')}
                  </h4>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">
                        {t('nueva_mascota.campos.lugar')} <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-custom"
                        name="lugar_rescate"
                        value={formData.lugar_rescate}
                        onChange={handleInputChange}
                        placeholder={t('nueva_mascota.placeholders.lugar')}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">
                        {t('nueva_mascota.campos.descripcion')} <span className="required">*</span>
                      </label>
                      <textarea
                        className="form-control form-control-custom"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        rows="5"
                        placeholder={t('nueva_mascota.placeholders.descripcion')}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">{t('nueva_mascota.campos.condiciones')}</label>
                      <textarea
                        className="form-control form-control-custom"
                        name="condiciones_especiales"
                        value={formData.condiciones_especiales}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder={t('nueva_mascota.placeholders.condiciones')}
                      />
                    </div>
                  </div>
                </div>

                {/* Sección 3: Salud y Vacunas */}
                <div className="form-section">
                  <h4 className="section-title">
                    <i className="fas fa-syringe me-2"></i>{t('nueva_mascota.secciones.salud_vacunas')}
                  </h4>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label d-block">{t('nueva_mascota.salud.opciones')}</label>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-check form-switch mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="necesita_hogar_temporal"
                              name="necesita_hogar_temporal"
                              checked={formData.necesita_hogar_temporal}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="necesita_hogar_temporal">
                              <i className="fas fa-home me-1"></i>{t('nueva_mascota.salud.hogar_temporal')}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check form-switch mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="apto_con_ninos"
                              name="apto_con_ninos"
                              checked={formData.apto_con_ninos}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="apto_con_ninos">
                              <i className="fas fa-child me-1"></i>{t('nueva_mascota.salud.apto_ninos')}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-check form-switch mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="apto_con_otros_animales"
                              name="apto_con_otros_animales"
                              checked={formData.apto_con_otros_animales}
                              onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="apto_con_otros_animales">
                              <i className="fas fa-dog me-1"></i>{t('nueva_mascota.salud.apto_animales')}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mt-3">
                      <SelectModerno
                        label={t('nueva_mascota.campos.vacunas')}
                        options={vacunas.map((vacuna) => ({
                          value: vacuna.id,
                          label: vacuna.nombre_vacuna,
                          subLabel: vacuna.frecuencia_dias ? `Cada ${vacuna.frecuencia_dias} días` : "",
                        }))}
                        value={formData.vacunas}
                        onChange={(selected) => setFormData({ ...formData, vacunas: selected })}
                        isMulti={true}
                        placeholder="Selecciona las vacunas..."
                        helpText={t('nueva_mascota.help.ctrl_multiple')}
                      />
                    </div>
                  </div>
                </div>

                {/* Sección 4: Galería de Fotos */}
                <div className="form-section">
                  <h4 className="section-title">
                    <i className="fas fa-camera me-2"></i>{t('nueva_mascota.secciones.galeria_fotos')}
                  </h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        {t('nueva_mascota.campos.foto_principal')} <span className="required">*</span>
                      </label>
                      <input
                        type="file"
                        className="form-control form-control-custom"
                        id="foto_principal"
                        name="foto_principal"
                        accept="image/jpeg,image/png,image/jpg,image/gif"
                        onChange={handleFileChange}
                        required={!fotoPrincipalPreview}
                      />
                      <div className="form-help">
                        <i className="fas fa-info-circle"></i> {t('nueva_mascota.help.foto_destacada')}
                      </div>

                      {fotoPrincipalPreview && (
                        <div className="preview-container mt-2">
                          <div className="preview-item position-relative">
                            <img src={fotoPrincipalPreview} alt="Vista previa" className="preview-image" />
                            <span className="preview-badge">Principal</span>
                            <button type="button" className="remove-preview" onClick={removeFotoPrincipal}>
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">{t('nueva_mascota.campos.galeria')}</label>
                      <input
                        type="file"
                        className="form-control form-control-custom"
                        id="galeria_fotos"
                        name="galeria_fotos"
                        multiple
                        accept="image/jpeg,image/png,image/jpg,image/gif"
                        onChange={handleFileChange}
                      />
                      <div className="form-help">
                        <i className="fas fa-info-circle"></i> {t('nueva_mascota.help.galeria')}
                      </div>

                      {galeriaPreviews.length > 0 && (
                        <div className="preview-container mt-2">
                          <div className="preview-title">Vista previa:</div>
                          <div className="gallery-preview">
                            {galeriaPreviews.map((preview, index) => (
                              <div key={index} className="gallery-preview-item">
                                <img src={preview} alt={`Preview ${index + 1}`} />
                                <span className="preview-badge">{index + 1}</span>
                                <button type="button" className="remove-preview" onClick={() => removeFotoGaleria(index)}>
                                  <i className="fas fa-times"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sección 5: Fechas y Fundación */}
                <div className="form-section">
                  <h4 className="section-title">
                    <i className="fas fa-calendar-alt me-2"></i>{t('nueva_mascota.secciones.fechas_organizacion')}
                  </h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        {t('nueva_mascota.campos.fecha_ingreso')} <span className="required">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-custom"
                        name="fecha_ingreso"
                        value={formData.fecha_ingreso}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">{t('nueva_mascota.campos.fecha_salida')}</label>
                      <input
                        type="date"
                        className="form-control form-control-custom"
                        name="fecha_salida"
                        value={formData.fecha_salida}
                        onChange={handleInputChange}
                      />
                    </div>

                    <SelectModerno
                      label={t('nueva_mascota.campos.fundacion')}
                      required
                      options={fundaciones.map((fundacion) => ({
                        value: fundacion.id,
                        label: fundacion.Nombre_1,
                      }))}
                      value={formData.fundacion_id ? [formData.fundacion_id] : []}
                      onChange={(selected) =>
                        setFormData({ ...formData, fundacion_id: selected[0] || "" })
                      }
                      isMulti={false}
                      placeholder={t('nueva_mascota.opciones.selecciona_fundacion')}
                    />
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="form-actions">
                  <button type="submit" className="btn btn-submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {t('nueva_mascota.botones.guardando')}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paw me-2"></i>{t('nueva_mascota.botones.guardar')}
                      </>
                    )}
                  </button>
                  <button type="button" className="btn btn-cancel" onClick={() => navigate("/admin/mascotas")} disabled={submitting}>
                    <i className="fas fa-times me-2"></i>{t('nueva_mascota.botones.cancelar')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMascotasNueva;