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
            <h2>Registrate</h2>
            <form onSubmit={handleSubmit}>
                <input
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    placeholder="Nombre de usuario"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />
                <button type="submit">Registrarme</button>
                {error && <div style={{ color: "red" }}>{error}</div>}
                {success && <div style={{ color: "green" }}>{success}</div>}
            </form>
        </>

    );
}
