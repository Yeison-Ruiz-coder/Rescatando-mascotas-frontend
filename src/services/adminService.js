import api from './api';

const adminService = {
    getFundaciones: async () => {
        try {
            const response = await api.get('/fundaciones');
            console.log('Fundaciones raw:', response.data);
            return response.data; // Debe ser { success: true, data: [...] }
        } catch (error) {
            console.error('Error en getFundaciones:', error);
            throw error;
        }
    },

    getRazas: async () => {
        try {
            const response = await api.get('/admin/razas');
            console.log('Razas raw:', response.data);
            return response.data; // Debe ser { success: true, data: [...] }
        } catch (error) {
            console.error('Error en getRazas:', error);
            throw error;
        }
    },

    getVacunas: async () => {
        try {
            const response = await api.get('/admin/tipos-vacunas');
            console.log('Vacunas raw:', response.data);
            return response.data; // Debe ser { success: true, data: [...] }
        } catch (error) {
            console.error('Error en getVacunas:', error);
            throw error;
        }
    },

    getRazasPorEspecie: async (especie) => {
        try {
            const response = await api.get(`/admin/razas/especie/${especie}`);
            return response.data;
        } catch (error) {
            console.error('Error en getRazasPorEspecie:', error);
            throw error;
        }
    }
};

export default adminService;