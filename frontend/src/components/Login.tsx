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
            onLogin(token);
        } catch (err) {
            setError("Error de conexión" + err);
        }
    };

    return (
        <>
            <h2>Logueate</h2>
            <form onSubmit={handleSubmit}>
                <input value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} placeholder="Usuario" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
                <button type="submit">Ingresar</button>
                {error && <div style={{ color: "red" }}>{error}</div>}
            </form>
        </>
    )
}
