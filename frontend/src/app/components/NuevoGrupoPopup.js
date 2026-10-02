"use client"
import { useState } from "react";
import Popup from "reactjs-popup";
import Button from "./Button";

export default function NuevoGrupoPopup({ idUserActual, onCreado }) {
  const [nombre, setNombre] = useState("");
  const [mailsTexto, setMailsTexto] = useState("");
  const [error, setError] = useState("");

  const crear = (cerrar) => {
    const mails = mailsTexto.split(",").map((m) => m.trim()).filter((m) => m !== "");

    fetch("http://localhost:4000/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, mails, idUserCreador: idUserActual, esGrupo: true }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Algún mail no existe");
        return res.json();
      })
      .then((nuevo) => {
        onCreado(nuevo);
        setNombre(""); setMailsTexto(""); setError("");
        cerrar();
      })
      .catch(() => setError("Alguno de esos mails no existe"));
  };

  return (
    <Popup trigger={<Button text="Nuevo grupo" />} modal>
      {(close) => (
        <div>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del grupo" />
          <input value={mailsTexto} onChange={(e) => setMailsTexto(e.target.value)} placeholder="Mails separados por coma" />
          <Button text="Crear grupo" onClick={() => crear(close)} disabled={!nombre || !mailsTexto} />
          {error && <p>{error}</p>}
        </div>
      )}
    </Popup>
  );
}