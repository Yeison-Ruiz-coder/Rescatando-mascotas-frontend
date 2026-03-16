import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useImageUrl from '../../../../hooks/useImageUrl';

const MascotaCard = ({ mascota }) => {
    const { t } = useTranslation('admin');
    const { getImageUrl } = useImageUrl();

    const getEstadoClass = (estado) => {
        const clases = {
            'En adopcion': 'badge-adopcion',
            'Adoptado': 'badge-adoptado',
            'Rescatada': 'badge-rescatada',
            'En acogida': 'badge-acogida'
        };
        return clases[estado] || 'badge-acogida';
    };

    const getEstadoTexto = (estado) => {
        const estados = {
            'En adopcion': t('mascotas.estados.en_adopcion'),
            'Adoptado': t('mascotas.estados.adoptado'),
            'Rescatada': t('mascotas.estados.rescatada'),
            'En acogida': t('mascotas.estados.en_acogida')
        };
        return estados[estado] || estado;
    };

    const getGeneroIcon = (genero) => {
        switch(genero) {
            case 'Macho': return 'mars';
            case 'Hembra': return 'venus';
            default: return 'question';
        }
    };

    const fotoPrincipal = getImageUrl(mascota.foto_principal);

    return (
        <div className="card mascota-card h-100">
            <div className="position-relative">
                <img 
                    src={fotoPrincipal}
                    className="card-img-top"
                    alt={mascota.nombre_mascota}
                />
                <span className={`mascota-badge ${getEstadoClass(mascota.estado)}`}>
                    {getEstadoTexto(mascota.estado)}
                </span>
            </div>
            
            <div className="card-body">
                <h5 className="mascota-nombre d-flex justify-content-between align-items-center">
                    {mascota.nombre_mascota}
                </h5>
                
                <div className="d-flex flex-wrap gap-2 mb-2">
                    <span className="badge bg-secondary">
                        <i className={`fas fa-${getGeneroIcon(mascota.genero)} me-1`}></i>
                        {mascota.genero}
                    </span>
                    <span className="badge bg-secondary">
                        <i className="fas fa-calendar-alt me-1"></i>
                        {mascota.edad_aprox} {t('mascotas.card.años')}
                    </span>
                    <span className="badge bg-secondary">
                        <i className="fas fa-dog me-1"></i>
                        {mascota.especie}
                    </span>
                </div>
                
                <p className="card-text small text-white-50 mb-2">
                    <i className="fas fa-map-marker-alt me-1"></i>
                    {mascota.lugar_rescate}
                </p>
                
                <p className="card-text text-white-50 small mb-3">
                    {mascota.descripcion}
                </p>

                {mascota.necesita_hogar_temporal && (
                    <span className="badge bg-warning w-100 py-2 mb-3">
                        <i className="fas fa-home me-1"></i>
                        {t('mascotas.card.necesita_hogar')}
                    </span>
                )}

                <div className="mascota-actions">
                    <Link 
                        to={`/admin/mascotas/${mascota.id}`} 
                        className="btn-ver"
                    >
                        <i className="fas fa-eye me-1"></i>
                        {t('mascotas.card.ver_detalles')}
                    </Link>
                    <Link 
                        to={`/admin/mascotas/editar/${mascota.id}`} 
                        className="btn-editar"
                    >
                        <i className="fas fa-edit me-1"></i>
                        {t('mascotas.card.editar')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MascotaCard;