"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Message from "../components/Message";
import useSocket from "@/hooks/useSocket";

const idUserActual = 1; // dato de prueba, se reemplaza cuando se integre el login

export default function ChatPage() {
  const searchParams = useSearchParams();
  const idChat = searchParams.get("id");

  const [idUserActual, setIdUserActual] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("")
  const { socket } = useSocket();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    setIdUserActual(usuario?.id_user);
  }, []);

  useEffect(() => {
    if(!idChat) return;
    fetch("http://localhost:4000/mensajes/1")
      .then((res) => res.json())
      .then((data) => setMensajes(data));
  }, [idChat]);


  useEffect(() => {
    if (!socket) return;
    socket.emit("joinRoom", { room: idChatActual });

    const manejarNuevoMensaje = (data) =>{
      setMensajes((prev) => [...prev, data]);
    }
    socket.on("newMessage", manejarNuevoMensaje)
    
    return(()=>{
      socket.off("newMessage", manejarNuevoMensaje)
    })
  }, [socket]);

  const enviarMensaje = () => {
    if (!socket || !texto) return;
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
          <Message key={m.id_mensaje} mensaje={m} esPropio={m.id_user === idUserActual} />
        ))
      )}
      <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Mensaje" />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
}
