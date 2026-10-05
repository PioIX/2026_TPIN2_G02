"use client"
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Message from "../components/Message";
import PresentChat from "../components/presentChat";
import { useSocket } from "@/hooks/useSocket";
import styles from "../styles.module.css";

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idChat = searchParams.get("id");
  const nombreChat = searchParams.get("nombre");
  const fotoChat = searchParams.get("foto");

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
    fetch(`http://localhost:4000/mensajes/${idChat}`)
      .then((res) => res.json())
      .then((data) => setMensajes(data));
  }, [idChat]);


  useEffect(() => {
    if (!socket || !idChat) return;
    socket.emit("joinRoom", { room: idChat });

    const manejarNuevoMensaje = (data) =>{
      setMensajes((prev) => [...prev, data]);
    }
    socket.on("newMessage", manejarNuevoMensaje)
    
    return(()=>{
      socket.off("newMessage", manejarNuevoMensaje)
    })
  }, [socket, idChat]);

  const enviarMensaje = () => {
    if (!socket || !texto) return;
    socket.emit("sendMessage", { id_chat: idChat, id_user: idUserActual, contenido: texto });
    setTexto("");
  };

  return (
    <div>
      <div className={styles.chatHeader}>
        <button onClick={() => router.push("/contactos")}>← Volver</button>
        <PresentChat chatImg={fotoChat} chatName={nombreChat} />
      </div>
      <div className={styles.mensajes}>
        {mensajes.length === 0 ? (
          <p>No hay mensajes todavía.</p>
        ) : (
          mensajes.map((m) => (
            <Message key={m.id_mensaje} mensaje={m} esPropio={m.id_user === idUserActual} />
          ))
        )}
      </div>
      <div className={styles.inputArea}>
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Mensaje" />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
}
