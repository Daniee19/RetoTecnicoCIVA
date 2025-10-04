import { useState } from 'react'

export const Register = ({ onRegister }: { onRegister: () => void }) => {

    const [nombreUsuario, setNombreUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:9090/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombreUsuario, password }),
            });
            if (!res.ok) {
                setError("No se pudo registrar el usuario");
                return;
            }
            setSuccess("Usuario registrado con éxito");
            setError("");
            setNombreUsuario("");
            setPassword("");

            // después de registrarse, redirigimos al login
            onRegister();
        } catch (err) {
            setError("Error de conexión: " + err);
        }
    }


    return (
        <>
            <h2 className="text-xl font-bold text-center mb-4">Regístrate</h2>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col ">
                <input
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    placeholder="Nombre de usuario"
                />
                <input
                    type="password"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />
                <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium"
                >
                    Registrarme
                </button>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                {success && <div className="text-green-600 text-sm">{success}</div>}
            </form>
        </>

    );
}
