"use client"
import { useState, useEffect } from "react";
import Message from "../components/Message";
import useSocket from "@/hooks/useSocket";

const idUserActual = 1; // dato de prueba, se reemplaza cuando se integre el login

export default function ChatPage() {
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/mensajes/1")
      .then((res) => res.json())
      .then((data) => setMensajes(data));
  }, []);

const { socket } = useSocket();
const idChatActual = 1; // raRO

useEffect(() => {
  if (!socket) return;
  socket.emit("joinRoom", { room: idChatActual });

  socket.on("newMessage", (data) => {
    setMensajes((prev) => [...prev, data]);
  });
}, [socket]);

const enviarMensaje = () => {// no se llama????
  socket.emit("sendMessage", { id_chat: idChatActual, id_user: ID_USER_ACTUAL, contenido: texto });
  setTexto("");
};

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
