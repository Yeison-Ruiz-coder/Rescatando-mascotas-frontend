import api from './api';

const adminMascotaService = {
    // Listado con filtros
    getMascotas: async (params = {}) => {
        try {
            console.log("📡 Llamando a API con params:", params);
            const response = await api.get('/admin/mascotas', { params });
            console.log("📡 Respuesta RAW del servicio:", response);
            console.log("📡 response.data:", response.data);
            return response.data; // { success: true, data: {...} }
        } catch (error) {
            console.error("❌ Error en servicio:", error);
            throw error.response?.data || error;
        }
    },

    getMascotas: async (params = {}) => {
        try {
            // Filtrar parámetros vacíos
            const cleanParams = {};
            Object.keys(params).forEach(key => {
                if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
                    cleanParams[key] = params[key];
                }
            });
            
            console.log("📡 Parámetros limpios:", cleanParams);
            const response = await api.get('/admin/mascotas', { params: cleanParams });
            console.log("📡 Respuesta del servicio:", response.data);
            return response.data;
        } catch (error) {
            console.error("❌ Error en servicio:", error);
            throw error.response?.data || error;
        }
    },

    // Obtener una mascota por ID
    getMascota: async (id) => {
        try {
            const response = await api.get(`/admin/mascotas/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Crear nueva mascota
    createMascota: async (formData) => {
        try {
            const response = await api.post('/admin/mascotas', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Actualizar mascota
    updateMascota: async (id, formData) => {
        try {
            // Para Laravel, necesitamos spoof el método PUT con POST
            formData.append('_method', 'PUT');
            const response = await api.post(`/admin/mascotas/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Eliminar mascota
    deleteMascota: async (id) => {
        try {
            const response = await api.delete(`/admin/mascotas/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Eliminar foto de galería
    deleteFotoGaleria: async (mascotaId, fotoPath) => {
        try {
            const response = await api.delete(`/admin/mascotas/${mascotaId}/foto-galeria`, {
                data: { foto: fotoPath }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default adminMascotaService;