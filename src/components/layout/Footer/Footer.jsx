import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { initFooter, footerEffects } from './footer-utils'; // <-- IMPORTACIÓN ACTUALIZADA
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation('layout');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    initFooter();
    footerEffects();
  }, []);

  return (
    <footer className="custom-footer">
      {/* Efecto de brillo (viene del CSS) */}
      
      {/* Main Content */}
      <div className="container footer-content-wrapper">
        <div className="row">
          {/* Logo y Misión */}
          <div className="col-lg-3 col-md-6 mb-4 footer-logo-col">
            <img 
              src="/img/logo-claro.png" 
              alt="Logo Rescatando Mascotas Forever" 
              className="footer-logo mb-3"
            />
            <img 
              src="/img/texto-logo-oscuro.png" 
              alt="Logo Rescatando Mascotas Forever" 
              className="footer-logo mb-3"
            />
          </div>

          {/* Contacto */}
          <div className="col-lg-3 col-md-6 mb-4 footer-section">
            <h5 className="footer-title">{t('footer.titulo_contacto')}</h5>
            <ul className="list-unstyled footer-list">
              <li>{t('footer.telefono')}</li>
              <li>
                <a href="mailto:contacto.rescatandomascotasforever@org">
                  {t('footer.email')}
                </a>
              </li>
              <li>{t('footer.direccion')}</li>
              <li>{t('footer.ciudad')}</li>
              <li>{t('footer.pais')}</li>
            </ul>
          </div>

          {/* Formularios y Servicios */}
          <div className="col-lg-4 col-md-6 mb-4 footer-section footer-forms-services">
            <div className="row">
              <div className="col-sm-6 mb-4 mb-sm-0">
                <h5 className="footer-title">{t('footer.titulo_formularios')}</h5>
                <ul className="list-unstyled footer-list">
                  <li><a href="/adopciones">{t('footer.adopcion')}</a></li>
                  <li><a href="/rescates">{t('footer.rescates')}</a></li>
                  <li><a href="/rescatistas">{t('footer.rescatistas')}</a></li>
                </ul>
              </div>
              <div className="col-sm-6">
                <h5 className="footer-title">{t('footer.titulo_servicios')}</h5>
                <ul className="list-unstyled footer-list">
                  <li><a href="/adopciones/proceso">{t('footer.proceso_adopcion')}</a></li>
                  <li><a href="/donaciones/suministros">{t('footer.donacion_suministros')}</a></li>
                  <li><a href="/donaciones">{t('footer.donaciones')}</a></li>
                  <li><a href="/rescatistas">{t('footer.rescatistas')}</a></li>
                  <li><a href="/eventos">{t('footer.eventos')}</a></li>
                  <li><a href="/calificacion">{t('footer.calificacion')}</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="col-lg-2 col-md-6 mb-4 footer-section footer-social-col">
            <h5 className="footer-title-social">{t('footer.titulo_siguenos')}</h5>
            <div className="social-icons">
              <a href="#" aria-label={t('footer.redes.facebook')}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label={t('footer.redes.whatsapp')}>
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#" aria-label={t('footer.redes.instagram')}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label={t('footer.redes.youtube')}>
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" aria-label={t('footer.redes.tiktok')}>
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="container">
          <hr className="footer-divider" />
          
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="copyright-text mb-2 mb-md-0">
                &copy; {currentYear} {t('footer.copyright')}
              </p>
            </div>
            
            <div className="col-md-6 text-center text-md-end">
              <ul className="legal-links">
                <li>
                  <a href="/privacidad">{t('footer.privacidad')}</a>
                </li>
                <li>
                  <a href="/terminos">{t('footer.terminos')}</a>
                </li>
                <li>
                  <a href="/cookies">{t('footer.cookies')}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;