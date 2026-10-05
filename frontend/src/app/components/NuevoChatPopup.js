"use client"
import { useState } from "react";
import Popup from "reactjs-popup";
import Button from "./Button";

export default function NuevoChatPopup({ idUserActual, onCreado }) {
  const [mail, setMail] = useState("");
  const [error, setError] = useState("");

  const crear = (cerrar) => {
    fetch("http://localhost:4000/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otroMail: mail, idUserCreador: idUserActual }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Usuario no encontrado");
        return res.json();
      })
      .then((nuevo) => {
        onCreado(nuevo);
        setMail("");
        setError("");
        cerrar();
      })
      .catch(() => setError("Ese usuario no existe"));
  };

  return (
    <Popup trigger={<Button text="Nuevo chat" />} modal>
      {(close) => (
        <div>
          <input value={mail} onChange={(e) => setMail(e.target.value)} placeholder="Mail del contacto" />
          <Button text="Crear" onClick={() => crear(close)} disabled={!mail} />
          {error && <p>{error}</p>}
        </div>
      )}
    </Popup>
  );
}