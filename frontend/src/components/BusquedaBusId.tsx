import React, { useEffect, useState } from 'react'

type BusquedaBusIdProps = {
    token: string;
};
interface MarcaBus {
    id: number;
    nombreMarca: string;
}
interface Bus {
    id: number;
    numeroBus: string;
    placa: string;
    fechaCreacion: string;
    caracteristicas: string;
    marcaBus: MarcaBus;
    estadoActivo: boolean;
}
export const BusquedaBusId: React.FC<BusquedaBusIdProps> = ({ token }) => {

    const [inputId, setInputId] = useState("");
    const [dataBusId, setDataBusId] = useState<Bus | null>(null);

    console.log("TOKEN RECIBIDO DESDE BUSQUEDABUSID: " + token);

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9090/api/bus/${inputId}`,
                { headers: token ? { Authorization: `Bearer ${token}` } : {} });
            const dataBus = await response.json();

            setDataBusId(dataBus);

        } catch (err) {
            console.log(`El error es ${err}`);
        }
    }
    useEffect(() => {
        if (dataBusId) {
            const { id, numeroBus, placa, fechaCreacion, caracteristicas, marcaBus, estadoActivo } = dataBusId;
            if (id) {
                alert(
                    `🚌 Bus encontrado!\n\n` +
                    `ID: ${id}\n` +
                    `Número: ${numeroBus}\n` +
                    `Placa: ${placa}\n` +
                    `Fecha creación: ${fechaCreacion}\n` +
                    `Características: ${caracteristicas}\n` +
                    `Marca: ${marcaBus?.nombreMarca ?? "Sin marca"}\n` +
                    `Estado: ${estadoActivo ? "Activo" : "Inactivo"}`
                );
            } else {
                alert("Bus no encontrado")
            }
        }
    }, [dataBusId]); // solo se ejecuta cuando cambia dataBusId

    return (
        <>

            <div className='flex gap-4 justify-end'>

                <input className='bg-gray-100 p-2 rounded-lg'
                    type="number"
                    onChange={(e) => setInputId(e.target.value)}
                    value={inputId} placeholder='Ingrese un número' min={1}
                />
                <button onClick={handleClick}
                    className='bg-blue-600 text-white px-3 py-2 text-sm hover:cursor-pointer rounded-xl'>Buscar bus por id</button>
            </div>

        </>
    )
}
