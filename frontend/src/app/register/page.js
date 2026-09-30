"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import Button from "../components/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [contra, setContra] = useState("");
  const [error, setError] = useState("");
  const [foto, setFoto] = useState(null);

  const registrarse = () => {
    const datos = new FormData();
    datos.append("username", username);
    datos.append("mail", mail);
    datos.append("contra", contra);
    if (foto) datos.append("foto", foto);

    fetch("http://localhost:4000/register", {
      method: "POST",
      body: datos,
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo registrar");
        return res.json();
      })
      .then(() => router.push("/login"))
      .catch(() => setError("Ese mail ya está registrado"));
  };

  return (
    <div>
      <h1>Crear cuenta</h1>
      <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
      <Input type="email" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Mail" />
      <Input type="password" value={contra} onChange={(e) => setContra(e.target.value)} placeholder="Contraseña" />
      <Input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} />
      <Button text="Registrarme" onClick={registrarse} disabled={!username || !mail || !contra} />
      {error && <p>{error}</p>}
    </div>
  );
}
