const useImageUrl = () => {
    const storageUrl = import.meta.env.VITE_STORAGE_URL || 'http://rescatando-mascotas-forever.test/storage';
    
    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/300x200?text=Sin+Imagen';
        
        // Si ya es una URL completa, devolverla
        if (path.startsWith('http')) return path;
        
        // Si es una ruta relativa, construir la URL completa
        return `${storageUrl}/${path}`;
    };

    return { getImageUrl };
};

export default useImageUrl;