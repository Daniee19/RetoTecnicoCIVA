import { useState, useEffect } from 'react'
import { dataFetch } from '../helpers/dataFetch';
export const useDataFetch = <T>(url: string, autoFetch = true) => {

    const [estado, setEstado] = useState<{
        data: T | null;
        errors: string | null;
    }>({
        data: null,
        errors: null
    });

    const [mostrarLogin, setMostrarLogin] = useState(false);

    const realizarFetch = async (token?: string) => {
        try {

            const data = await dataFetch(url, token);

            //Si no cuenta con el JWT
            if (data === null) {
                setMostrarLogin(true);
            }

            setEstado({ data: data, errors: null });
        } catch (error: unknown) {
            const mensaje = error instanceof Error ? error.message : String(error);
            setEstado({ data: null, errors: mensaje });
        }
    }

    useEffect(() => {
        if (autoFetch) realizarFetch();
    }, [url]);

    return {
        data: estado.data,
        errors: estado.errors,
        mostrarLogin: mostrarLogin,
        fetchNow: realizarFetch
    }
}
