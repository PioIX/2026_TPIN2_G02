jsx
"use client"
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function LoginPage() {
  const [mail, setMail] = useState("");
  const [contra, setContra] = useState("");
  const [error, setError] = useState("");

  const iniciarSesion = () => {
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail, contra }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Credenciales inválidas");
        return res.json();
      })
      .then((usuario) => {
        console.log("Usuario logueado:", usuario);
        // Falta guardar el usuario y redirigir — se completa en la próxima clase
      })
      .catch(() => setError("Mail o contraseña incorrectos"));
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <Input type="email" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Mail" />
      <Input type="password" value={contra} onChange={(e) => setContra(e.target.value)} placeholder="Contraseña" />
      <Button text="Ingresar" onClick={iniciarSesion} disabled={!mail || !contra} />
      {error && <p>{error}</p>}
    </div>
  );
}
