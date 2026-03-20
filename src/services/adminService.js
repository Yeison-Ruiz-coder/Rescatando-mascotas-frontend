// services/adminService.js
import api from './api';

const adminService = {
    // ========== USUARIOS ==========
    getUsuarios: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.search) queryParams.append('search', params.search);
            if (params.tipo) queryParams.append('tipo', params.tipo);
            if (params.estado) queryParams.append('estado', params.estado);
            
            const response = await api.get(`/admin/usuarios?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getUsuarios:', error);
            throw error;
        }
    },

    getUsuario: async (id) => {
        try {
            const response = await api.get(`/admin/usuarios/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getUsuario:', error);
            throw error;
        }
    },

    createUsuario: async (data) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key] !== null && data[key] !== undefined) {
                    formData.append(key, data[key]);
                }
            });
            const response = await api.post('/admin/usuarios', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            console.error('Error en createUsuario:', error);
            throw error;
        }
    },

    updateUsuario: async (id, data) => {
        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            Object.keys(data).forEach(key => {
                if (data[key] !== null && data[key] !== undefined) {
                    formData.append(key, data[key]);
                }
            });
            const response = await api.post(`/admin/usuarios/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            console.error('Error en updateUsuario:', error);
            throw error;
        }
    },

    deleteUsuario: async (id) => {
        try {
            const response = await api.delete(`/admin/usuarios/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteUsuario:', error);
            throw error;
        }
    },

    cambiarEstadoUsuario: async (id, estado) => {
        try {
            const response = await api.patch(`/admin/usuarios/${id}/estado`, { estado });
            return response.data;
        } catch (error) {
            console.error('Error en cambiarEstadoUsuario:', error);
            throw error;
        }
    },

    verificarEmailUsuario: async (id) => {
        try {
            const response = await api.post(`/admin/usuarios/${id}/verificar-email`);
            return response.data;
        } catch (error) {
            console.error('Error en verificarEmailUsuario:', error);
            throw error;
        }
    },

    // ========== MASCOTAS ==========
    getMascotas: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.search) queryParams.append('search', params.search);
            if (params.especie) queryParams.append('especie', params.especie);
            if (params.estado) queryParams.append('estado', params.estado);
            if (params.fundacion_id) queryParams.append('fundacion_id', params.fundacion_id);
            
            const response = await api.get(`/admin/mascotas?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getMascotas:', error);
            throw error;
        }
    },

    getMascota: async (id) => {
        try {
            const response = await api.get(`/admin/mascotas/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getMascota:', error);
            throw error;
        }
    },

    createMascota: async (data) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key] !== null && data[key] !== undefined) {
                    if (key === 'fotos' && Array.isArray(data[key])) {
                        data[key].forEach((foto, index) => {
                            formData.append(`fotos[${index}]`, foto);
                        });
                    } else {
                        formData.append(key, data[key]);
                    }
                }
            });
            const response = await api.post('/admin/mascotas', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            console.error('Error en createMascota:', error);
            throw error;
        }
    },

    updateMascota: async (id, data) => {
        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            Object.keys(data).forEach(key => {
                if (data[key] !== null && data[key] !== undefined) {
                    if (key === 'fotos' && Array.isArray(data[key])) {
                        data[key].forEach((foto, index) => {
                            formData.append(`fotos[${index}]`, foto);
                        });
                    } else {
                        formData.append(key, data[key]);
                    }
                }
            });
            const response = await api.post(`/admin/mascotas/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            console.error('Error en updateMascota:', error);
            throw error;
        }
    },

    deleteMascota: async (id) => {
        try {
            const response = await api.delete(`/admin/mascotas/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteMascota:', error);
            throw error;
        }
    },

    eliminarFotoGaleria: async (mascotaId, fotoId) => {
        try {
            const response = await api.delete(`/admin/mascotas/${mascotaId}/foto-galeria`, {
                data: { foto_id: fotoId }
            });
            return response.data;
        } catch (error) {
            console.error('Error en eliminarFotoGaleria:', error);
            throw error;
        }
    },

    // ========== ADOPCIONES ==========
    getAdopciones: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.estado) queryParams.append('estado', params.estado);
            
            const response = await api.get(`/admin/adopciones?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getAdopciones:', error);
            throw error;
        }
    },

    cambiarEstadoAdopcion: async (id, estado) => {
        try {
            const response = await api.patch(`/admin/adopciones/${id}/estado`, { estado });
            return response.data;
        } catch (error) {
            console.error('Error en cambiarEstadoAdopcion:', error);
            throw error;
        }
    },

    getSeguimientosAdopcion: async (adopcionId) => {
        try {
            const response = await api.get(`/admin/adopciones/${adopcionId}/seguimientos`);
            return response.data;
        } catch (error) {
            console.error('Error en getSeguimientosAdopcion:', error);
            throw error;
        }
    },

    crearSeguimientoAdopcion: async (adopcionId, data) => {
        try {
            const response = await api.post(`/admin/adopciones/${adopcionId}/seguimientos`, data);
            return response.data;
        } catch (error) {
            console.error('Error en crearSeguimientoAdopcion:', error);
            throw error;
        }
    },

    // ========== SOLICITUDES ==========
    getSolicitudes: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.status) queryParams.append('status', params.status);
            
            const response = await api.get(`/admin/solicitudes?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getSolicitudes:', error);
            throw error;
        }
    },

    updateStatusSolicitud: async (id, status, observaciones = null) => {
        try {
            const response = await api.patch(`/admin/solicitudes/${id}/status`, { status, observaciones });
            return response.data;
        } catch (error) {
            console.error('Error en updateStatusSolicitud:', error);
            throw error;
        }
    },

    getEstadisticasSolicitudes: async () => {
        try {
            const response = await api.get('/admin/solicitudes-estadisticas/generales');
            return response.data;
        } catch (error) {
            console.error('Error en getEstadisticasSolicitudes:', error);
            throw error;
        }
    },

    // ========== DONACIONES ==========
    getDonaciones: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.user_id) queryParams.append('user_id', params.user_id);
            
            const response = await api.get(`/admin/donaciones?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getDonaciones:', error);
            throw error;
        }
    },

    toggleDonacionPublica: async (id) => {
        try {
            const response = await api.patch(`/admin/donaciones/${id}/toggle-publica`);
            return response.data;
        } catch (error) {
            console.error('Error en toggleDonacionPublica:', error);
            throw error;
        }
    },

    getReporteDonaciones: async () => {
        try {
            const response = await api.get('/admin/donaciones-reportes/generales');
            return response.data;
        } catch (error) {
            console.error('Error en getReporteDonaciones:', error);
            throw error;
        }
    },

    // ========== RESCATES ==========
    getRescates: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.estado) queryParams.append('estado', params.estado);
            
            const response = await api.get(`/admin/rescates?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getRescates:', error);
            throw error;
        }
    },

    completarRescate: async (id, data) => {
        try {
            const response = await api.post(`/admin/rescates/${id}/completar`, data);
            return response.data;
        } catch (error) {
            console.error('Error en completarRescate:', error);
            throw error;
        }
    },

    asignarEntidadRescate: async (id, entidadId, entidadTipo) => {
        try {
            const response = await api.post(`/admin/rescates/${id}/asignar-entidad`, {
                entidad_id: entidadId,
                entidad_tipo: entidadTipo
            });
            return response.data;
        } catch (error) {
            console.error('Error en asignarEntidadRescate:', error);
            throw error;
        }
    },

    getEstadisticasRescates: async () => {
        try {
            const response = await api.get('/admin/rescates-estadisticas/generales');
            return response.data;
        } catch (error) {
            console.error('Error en getEstadisticasRescates:', error);
            throw error;
        }
    },

    // ========== FUNDACIONES ==========
    getFundaciones: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.search) queryParams.append('search', params.search);
            
            const response = await api.get(`/admin/fundaciones?${queryParams.toString()}`);
            console.log('Fundaciones raw:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error en getFundaciones:', error);
            throw error;
        }
    },

    getFundacion: async (id) => {
        try {
            const response = await api.get(`/admin/fundaciones/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getFundacion:', error);
            throw error;
        }
    },

    createFundacion: async (data) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key] !== null && data[key] !== undefined) {
                    formData.append(key, data[key]);
                }
            });
            const response = await api.post('/admin/fundaciones', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            console.error('Error en createFundacion:', error);
            throw error;
        }
    },

    updateFundacion: async (id, data) => {
        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            Object.keys(data).forEach(key => {
                if (data[key] !== null && data[key] !== undefined) {
                    formData.append(key, data[key]);
                }
            });
            const response = await api.post(`/admin/fundaciones/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            console.error('Error en updateFundacion:', error);
            throw error;
        }
    },

    deleteFundacion: async (id) => {
        try {
            const response = await api.delete(`/admin/fundaciones/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteFundacion:', error);
            throw error;
        }
    },

    getNecesidadesFundacion: async (fundacionId) => {
        try {
            const response = await api.get(`/admin/fundaciones/${fundacionId}/necesidades`);
            return response.data;
        } catch (error) {
            console.error('Error en getNecesidadesFundacion:', error);
            throw error;
        }
    },

    actualizarNecesidadesFundacion: async (fundacionId, necesidades) => {
        try {
            const response = await api.put(`/admin/fundaciones/${fundacionId}/necesidades`, { necesidades });
            return response.data;
        } catch (error) {
            console.error('Error en actualizarNecesidadesFundacion:', error);
            throw error;
        }
    },

    // ========== VETERINARIAS ==========
    getVeterinarias: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.search) queryParams.append('search', params.search);
            if (params.ciudad) queryParams.append('ciudad', params.ciudad);
            
            const response = await api.get(`/admin/veterinarias?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getVeterinarias:', error);
            throw error;
        }
    },

    getVeterinariasCercanas: async (lat, lng, radio = 5) => {
        try {
            const response = await api.get(`/admin/veterinarias/cercanas?lat=${lat}&lng=${lng}&radio=${radio}`);
            return response.data;
        } catch (error) {
            console.error('Error en getVeterinariasCercanas:', error);
            throw error;
        }
    },

    // ========== RAZAS ==========
    getRazas: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.especie) queryParams.append('especie', params.especie);
            
            const response = await api.get(`/admin/razas?${queryParams.toString()}`);
            console.log('Razas raw:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error en getRazas:', error);
            throw error;
        }
    },

    getRaza: async (id) => {
        try {
            const response = await api.get(`/admin/razas/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getRaza:', error);
            throw error;
        }
    },

    createRaza: async (data) => {
        try {
            const response = await api.post('/admin/razas', data);
            return response.data;
        } catch (error) {
            console.error('Error en createRaza:', error);
            throw error;
        }
    },

    updateRaza: async (id, data) => {
        try {
            const response = await api.put(`/admin/razas/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateRaza:', error);
            throw error;
        }
    },

    deleteRaza: async (id) => {
        try {
            const response = await api.delete(`/admin/razas/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteRaza:', error);
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
    },

    getEspecies: async () => {
        try {
            const response = await api.get('/admin/razas-especies/todas');
            return response.data;
        } catch (error) {
            console.error('Error en getEspecies:', error);
            throw error;
        }
    },

    // ========== TIPOS DE VACUNA ==========
    getTiposVacunas: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.search) queryParams.append('search', params.search);
            
            const response = await api.get(`/admin/tipos-vacunas?${queryParams.toString()}`);
            console.log('Vacunas raw:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error en getTiposVacunas:', error);
            throw error;
        }
    },

    getVacunasRecomendadas: async () => {
        try {
            const response = await api.get('/admin/tipos-vacunas/recomendadas');
            return response.data;
        } catch (error) {
            console.error('Error en getVacunasRecomendadas:', error);
            throw error;
        }
    },

    getEstadisticasVacunas: async () => {
        try {
            const response = await api.get('/admin/tipos-vacunas-estadisticas/generales');
            return response.data;
        } catch (error) {
            console.error('Error en getEstadisticasVacunas:', error);
            throw error;
        }
    },

    // ========== PRODUCTOS ==========
    getProductos: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.search) queryParams.append('search', params.search);
            if (params.categoria_id) queryParams.append('categoria_id', params.categoria_id);
            if (params.estado) queryParams.append('estado', params.estado);
            
            const response = await api.get(`/admin/productos?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getProductos:', error);
            throw error;
        }
    },

    cambiarEstadoProducto: async (id, estado) => {
        try {
            const response = await api.patch(`/admin/productos/${id}/estado`, { estado });
            return response.data;
        } catch (error) {
            console.error('Error en cambiarEstadoProducto:', error);
            throw error;
        }
    },

    actualizarStockProducto: async (id, cantidad, operacion = 'agregar') => {
        try {
            const response = await api.post(`/admin/productos/${id}/stock`, { cantidad, operacion });
            return response.data;
        } catch (error) {
            console.error('Error en actualizarStockProducto:', error);
            throw error;
        }
    },

    getProductosStockBajo: async () => {
        try {
            const response = await api.get('/admin/productos-stock/bajo');
            return response.data;
        } catch (error) {
            console.error('Error en getProductosStockBajo:', error);
            throw error;
        }
    },

    // ========== PEDIDOS ==========
    getPedidos: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.estado) queryParams.append('estado', params.estado);
            
            const response = await api.get(`/admin/pedidos?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getPedidos:', error);
            throw error;
        }
    },

    cambiarEstadoPedido: async (id, estado) => {
        try {
            const response = await api.patch(`/admin/pedidos/${id}/estado`, { estado });
            return response.data;
        } catch (error) {
            console.error('Error en cambiarEstadoPedido:', error);
            throw error;
        }
    },

    getReportePedidos: async () => {
        try {
            const response = await api.get('/admin/pedidos-reportes/generales');
            return response.data;
        } catch (error) {
            console.error('Error en getReportePedidos:', error);
            throw error;
        }
    },

    // ========== CATEGORÍAS ==========
    getCategorias: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.parent_id) queryParams.append('parent_id', params.parent_id);
            
            const response = await api.get(`/admin/categorias?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getCategorias:', error);
            throw error;
        }
    },

    getCategoria: async (id) => {
        try {
            const response = await api.get(`/admin/categorias/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getCategoria:', error);
            throw error;
        }
    },

    createCategoria: async (data) => {
        try {
            const response = await api.post('/admin/categorias', data);
            return response.data;
        } catch (error) {
            console.error('Error en createCategoria:', error);
            throw error;
        }
    },

    updateCategoria: async (id, data) => {
        try {
            const response = await api.put(`/admin/categorias/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error en updateCategoria:', error);
            throw error;
        }
    },

    deleteCategoria: async (id) => {
        try {
            const response = await api.delete(`/admin/categorias/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteCategoria:', error);
            throw error;
        }
    },

    toggleCategoriaActivo: async (id) => {
        try {
            const response = await api.patch(`/admin/categorias/${id}/toggle`);
            return response.data;
        } catch (error) {
            console.error('Error en toggleCategoriaActivo:', error);
            throw error;
        }
    },

    getArbolCategorias: async () => {
        try {
            const response = await api.get('/admin/categorias-arbol');
            return response.data;
        } catch (error) {
            console.error('Error en getArbolCategorias:', error);
            throw error;
        }
    },

    getCategoriasParaSelect: async () => {
        try {
            const response = await api.get('/admin/categorias/para-select');
            return response.data;
        } catch (error) {
            console.error('Error en getCategoriasParaSelect:', error);
            throw error;
        }
    },

    // ========== EVENTOS ==========
    getEventos: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.proximos) queryParams.append('proximos', params.proximos);
            
            const response = await api.get(`/admin/eventos?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getEventos:', error);
            throw error;
        }
    },

    getEventosCalendario: async () => {
        try {
            const response = await api.get('/admin/eventos/calendario/data');
            return response.data;
        } catch (error) {
            console.error('Error en getEventosCalendario:', error);
            throw error;
        }
    },

    getEventosProximos: async () => {
        try {
            const response = await api.get('/admin/eventos/proximos');
            return response.data;
        } catch (error) {
            console.error('Error en getEventosProximos:', error);
            throw error;
        }
    },

    // ========== DASHBOARD ==========
    getDashboard: async () => {
        try {
            const response = await api.get('/admin/dashboard');
            return response.data;
        } catch (error) {
            console.error('Error en getDashboard:', error);
            throw error;
        }
    },

    getEstadisticasGenerales: async () => {
        try {
            const response = await api.get('/admin/reportes/generales');
            return response.data;
        } catch (error) {
            console.error('Error en getEstadisticasGenerales:', error);
            throw error;
        }
    },

    // ========== REPORTES ==========
    getReportes: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.tipo) queryParams.append('tipo', params.tipo);
            if (params.estado) queryParams.append('estado', params.estado);
            
            const response = await api.get(`/admin/reportes?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getReportes:', error);
            throw error;
        }
    },

    convertirReporteARescate: async (id, data) => {
        try {
            const response = await api.post(`/admin/reportes/${id}/convertir-rescate`, data);
            return response.data;
        } catch (error) {
            console.error('Error en convertirReporteARescate:', error);
            throw error;
        }
    },

    // ========== COMENTARIOS ==========
    getComentarios: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.entidad_tipo) queryParams.append('entidad_tipo', params.entidad_tipo);
            if (params.aprobado !== undefined) queryParams.append('aprobado', params.aprobado);
            
            const response = await api.get(`/admin/comentarios?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getComentarios:', error);
            throw error;
        }
    },

    deleteComentario: async (id) => {
        try {
            const response = await api.delete(`/admin/comentarios/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en deleteComentario:', error);
            throw error;
        }
    },

    accionMasivaComentarios: async (ids, accion) => {
        try {
            const response = await api.post('/admin/comentarios/accion-masiva', { ids, accion });
            return response.data;
        } catch (error) {
            console.error('Error en accionMasivaComentarios:', error);
            throw error;
        }
    },

    // ========== TIENDAS ==========
    getTiendas: async (params = {}) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.page) queryParams.append('page', params.page);
            if (params.search) queryParams.append('search', params.search);
            
            const response = await api.get(`/admin/tiendas?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error en getTiendas:', error);
            throw error;
        }
    },

    getTienda: async (id) => {
        try {
            const response = await api.get(`/admin/tiendas/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error en getTienda:', error);
            throw error;
        }
    },

    getProductosTienda: async (tiendaId) => {
        try {
            const response = await api.get(`/admin/tiendas/${tiendaId}/productos`);
            return response.data;
        } catch (error) {
            console.error('Error en getProductosTienda:', error);
            throw error;
        }
    }
};

export default adminService;