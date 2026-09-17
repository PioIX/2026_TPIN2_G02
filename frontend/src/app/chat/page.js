"use client"
import { useState, useEffect } from "react";
import Message from "@/components/Message";

const ID_USER_ACTUAL = 1; // dato de prueba, se reemplaza cuando se integre el login

export default function ChatPage() {
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/mensajes/1")
      .then((res) => res.json())
      .then((data) => setMensajes(data));
  }, []);

  return (
    <div>
      <h1>Chat</h1>
      {mensajes.length === 0 ? (
        <p>No hay mensajes todavía.</p>
      ) : (
        mensajes.map((m) => (
          <Message key={m.id_mensaje} mensaje={m} esPropio={m.id_user === ID_USER_ACTUAL} />
        ))
      )}
    </div>
  );
}
