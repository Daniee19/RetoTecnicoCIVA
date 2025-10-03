import { useEffect, useState } from 'react';
import { useDataFetch } from './hooks/useDataFetch';
import { Login } from './components/Login';
import { Register } from './components/Register';

type Item = {
    id: number,
    numeroBus: string
    placa: string,
    fechaCreacion: Date,
    caracteristicas: string,
    marcaBus: number,
    estadoActivo: boolean
};

export const Home = () => {

    const [valor, setValor] = useState<Item[]>([]);
    const { data, isLoading, errors, mostrarLogin, fetchNow } = useDataFetch("http://localhost:9090/api/bus", false);
    const [token, setToken] = useState("");
    const [mostrarLoginFront, setMostrarLoginFront] = useState(false);
    const [esRegistro, setEsRegistro] = useState(false); // 👈 controla login/registro

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

    useEffect(() => {
        if (data) { setValor(data); }
    }, [data])

    return (
        <div>
            <h1>Bienvenido a CIVA</h1>
            <h4>Consultar vehículos</h4>
            <button onClick={handleClick}>Consultar</button>
            {mostrarLoginFront ? (
                esRegistro ? (
                    <>
                        <Register onRegister={() => setEsRegistro(false)} />
                        <p>
                            ¿Ya tienes cuenta?{" "}
                            <a href="#" onClick={() => setEsRegistro(false)}>
                                Inicia sesión
                            </a>
                        </p>
                    </>
                ) : (
                    <>
                        <Login onLogin={(t) => { setToken(t); setMostrarLoginFront(false); }} />
                        <p>
                            ¿No tienes cuenta?{" "}
                            <a href="#" onClick={() => setEsRegistro(true)}>
                                Regístrate
                            </a>
                        </p>
                    </>
                )
            )
                : isLoading
                    ? <div>Cargando...</div>
                    : errors
                        ? <div>Errores a resolver: {errors}</div>
                        : <table>
                            <thead>
                                <tr>
                                    <th>Marca</th>
                                    <th>Placa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {valor.map(
                                    v =>
                                        <tr key={v.id}>
                                            <td>{v.marcaBus}</td>
                                            <td>{v.placa}</td>
                                        </tr>
                                )}
                            </tbody>
                        </table>
            }
        </div>
    )
}
