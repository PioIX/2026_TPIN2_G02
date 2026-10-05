"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "../styles.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [foto, setFoto] = useState("");
  const [contra, setContra] = useState("");
  const [error, setError] = useState("");

  const registrarse = () => {
    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, mail, contra, foto: foto || null }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo registrar");
        return res.json();
      })
      .then(() => router.push("/"))
      .catch(() => setError("Ese mail ya está registrado"));
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.tarjeta}>
        <h1>Crear cuenta</h1>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" className={styles.input}/>
        <Input type="email" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Mail" className={styles.input}/>
        <Input type="password" value={contra} onChange={(e) => setContra(e.target.value)} placeholder="Contraseña" className={styles.input}/>
        <Input value={foto} onChange={(e) => setFoto(e.target.value)} placeholder="URL de tu foto (opcional)" className={styles.input}/>
        <Button text="Registrarme" onClick={registrarse} disabled={!username || !mail || !contra} className={styles.boton}/>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}