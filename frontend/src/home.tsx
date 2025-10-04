import { useEffect, useState } from 'react';
import { useDataFetch } from './hooks/useDataFetch';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BusquedaBusId } from './components/BusquedaBusId';

type Item = {
    id: number,
    numeroBus: string
    placa: string,
    fechaCreacion: string,
    caracteristicas: string,
    marcaBus: {
        id: number,
        nombreMarca: string,
        buses?: null
    },
    estadoActivo: boolean
};
type Page<T> = {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number; // página actual
    size: number;   // tamaño por página
    first: boolean;
    last: boolean;
};
export const Home = () => {
    //Paginación
    const [paginaActual, setPaginaActual] = useState(0); //0-index para Spring Pageable
    const [totalPaginas, setTotalPaginas] = useState(0);
    const itemsPorPagina = 5;

    //Datos
    const [valor, setValor] = useState<Item[]>([]);
    const { data, errors, mostrarLogin, fetchNow } =
        useDataFetch<Page<Item>>(`http://localhost:9090/api/bus?page=${paginaActual}&size=${itemsPorPagina}`, false);

    const [token, setToken] = useState("");
    const [mostrarLoginFront, setMostrarLoginFront] = useState(false);
    const [esRegistro, setEsRegistro] = useState(false); // controla login/registro

    const handleClick = async () => {
        if (token) {
            await fetchNow(token);
        } else {
            setMostrarLoginFront(true);
        }
    }

    useEffect(() => {
        setMostrarLoginFront(false);
    }, [mostrarLogin])

    // Actualizar datos cuando llega respuesta del backend
    useEffect(() => {
        if (data) {
            setValor(data.content);
            setTotalPaginas(data.totalPages)
        }
    }, [data])

    useEffect(() => {
        if (token) {
            fetchNow(token); // Trae los datos del backend con la nueva página
        }
    }, [paginaActual]);

    //Cambiar de página
    const irAPagina = (num: number) => {
        setPaginaActual(num);
        fetchNow(token); //refetch con la nueva página
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-blue-900 text-white p-6">
            <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-20 max-w-5xl flex gap-10">
                <div className='flex flex-col justify-center'>
                    <div>
                        <p className='text-gray-200 text-sm'>By: Daniel Castañeda</p>
                    </div>
                    <h1 className="text-3xl font-bold text-center text-blue-700">
                        Bienvenido a CIVA
                    </h1>
                    <h4 className="text-center text-gray-500 mb-6">
                        Tu servicio de confianza
                    </h4>

                    {!token ? (
                        <p className="text-center text-gray-700 mb-4">
                            Necesitas loguearte para poder ver los buses
                        </p>
                    ) : (
                        <p className="text-center text-green-600 mb-4">
                            Consulta los buses presionando el botón
                        </p>
                    )}

                    <div className="flex justify-center mb-6">
                        <button
                            onClick={handleClick}
                            className="px-6 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium shadow"
                        >
                            {!token ? "Loguearse" : "Consultar"}
                        </button>
                    </div>
                </div>
                {mostrarLoginFront ? (
                    esRegistro ? (
                        <>
                            <div>
                                <Register onRegister={() => setEsRegistro(false)} />
                                <p className="text-sm text-center mt-4">
                                    ¿Ya tienes cuenta?{" "}
                                    <button
                                        onClick={() => setEsRegistro(false)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Inicia sesión
                                    </button>
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex flex-col'>
                                <Login
                                    onLogin={(t) => {
                                        setToken(t);
                                        setMostrarLoginFront(false);
                                    }}
                                />
                                <p className="text-sm text-center mt-4">
                                    ¿No tienes cuenta?{" "}
                                    <button
                                        onClick={() => setEsRegistro(true)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Regístrate
                                    </button>
                                </p>
                            </div>
                        </>
                    )
                ) : (
                    <>
                        {errors && <p className="text-center text-red-600">Errores: {errors}</p>}

                        {valor.length > 0 && (
                            <>

                                <div >
                                    <BusquedaBusId token={token} />
                                    <div className="overflow-x-auto mt-6">
                                        <table className="w-full text-left border-collapse rounded-lg overflow-hidden shadow">
                                            <thead className="bg-blue-700 text-white">
                                                <tr>
                                                    <th className='px-4 py-2'>ID Bus</th>
                                                    <th className="px-4 py-2">N° Bus</th>
                                                    <th className="px-4 py-2">Placa</th>
                                                    <th className="px-4 py-2">Fecha de Creación</th>
                                                    <th className="px-4 py-2">Características</th>
                                                    <th className="px-4 py-2">Marca</th>
                                                    <th className="px-4 py-2">Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {valor.map((v) => (
                                                    <tr key={v.id} className="odd:bg-gray-100 even:bg-white">
                                                        <td className="px-4 py-2">{v.id}</td>
                                                        <td className="px-4 py-2">{v.numeroBus}</td>
                                                        <td className="px-4 py-2">{v.placa}</td>
                                                        <td className="px-4 py-2">{v.fechaCreacion}</td>
                                                        <td className="px-4 py-2">{v.caracteristicas}</td>
                                                        <td className="px-4 py-2">{v.marcaBus.nombreMarca}</td>
                                                        <td className="px-4 py-2">
                                                            {v.estadoActivo ? (
                                                                <span className="px-2 py-1 text-xs rounded bg-green-200 text-green-800">
                                                                    Activo
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-1 text-xs rounded bg-red-200 text-red-800">
                                                                    Inactivo
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* PAGINACIÓN */}
                                    <div>
                                        <div className="flex justify-center mt-4 gap-2">
                                            <button
                                                onClick={() => irAPagina(Math.max(paginaActual - 1, 0))}
                                                disabled={paginaActual === 0}
                                                className="px-3 py-1 bg-blue-700 text-white rounded disabled:opacity-50"
                                            >
                                                Anterior
                                            </button>
                                            {[...Array(totalPaginas)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => irAPagina(i)}
                                                    className={`px-3 py-1 rounded ${paginaActual === i ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => irAPagina(Math.min(paginaActual + 1, totalPaginas - 1))}
                                                disabled={paginaActual === totalPaginas - 1}
                                                className="px-3 py-1 bg-blue-700 text-white rounded disabled:opacity-50"
                                            >
                                                Siguiente
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )}

                    </>
                )}

            </div>
        </div>
    )
}
