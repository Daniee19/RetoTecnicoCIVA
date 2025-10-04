export const dataFetch = async (url: string, token?: string) => {

    const response = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}    });

    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
    }

    if (response.status === 401) {
        // mostrar login si no está autenticado
        return null;
    }
    
    return response.json();
}