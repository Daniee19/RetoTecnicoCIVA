import { useState } from 'react'

export const Login = ({ onLogin }: { onLogin: (token: string) => void }) => {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:9090/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombreUsuario, password })
            });

            if (!res.ok) {
                setError("Usuario o contraseña incorrecta");
                return;
            }

            const { token } = await res.json();
            alert("El token es: " + token);
            onLogin(token);
        } catch (err) {
            setError("Error de conexión" + err);
        }
    };

    return (
        <>
            <h2 className="text-xl font-bold text-center mb-4">Inicia Sesión</h2>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
                <input
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    placeholder="Usuario"
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
                    className="w-full py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium"
                >
                    Ingresar
                </button>
                {error && <div className="text-red-600 text-sm">{error}</div>}
            </form>
        </>
    )
}
