import { useTranslation } from 'react-i18next';

export const useTranslate = () => {
  const { t: tCommon } = useTranslation('common');
  const { t: tHome } = useTranslation('home');
  const { t: tMascotas } = useTranslation('mascotas');
  const { t: tAuth } = useTranslation('auth');

  return {
    t: tCommon,           // Traducciones comunes
    tHome,                // Traducciones del home
    tMascotas,            // Traducciones de mascotas
    tAuth,                // Traducciones de autenticación
    // Función para traducir con namespace específico
    tn: (ns, key, options) => {
      const translators = {
        common: tCommon,
        home: tHome,
        mascotas: tMascotas,
        auth: tAuth,
      };
      return translators[ns](key, options);
    }
  };
};