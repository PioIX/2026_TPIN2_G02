"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function LoginPage() {
  const [mail, setMail] = useState("");
  const [contra, setContra] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

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
        localStorage.setItem("usuario", JSON.stringify(usuario));
        router.push("/");
      })
      .catch(() => setError("Mail o contraseña incorrectos"));
  };

  const evail = (event) => setMail(event.target.value)
  const evcons = (event) => setContra(event.target.value)

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <Input type="email" value={mail} onChange={evail} placeholder="Mail" />
      <Input type="password" value={contra} onChange={evcons} placeholder="Contraseña" />
      <Button text="Ingresar" onClick={iniciarSesion} disabled={!mail || !contra} />
      {error && <p>{error}</p>}
    </div>
  );
}