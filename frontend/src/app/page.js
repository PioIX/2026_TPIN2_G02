"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatList from "./components/ChatList";
import NuevoChatPopup from "./components/NuevoChatPopup";
import NuevoGrupoPopup from "./components/NuevoGrupoPopup";

export default function Home() {
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [idUserActual, setIdUserActual] = useState(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      router.push("/login");
      return;
    }
    setIdUserActual(usuario.id_user);
  }, [router]);

  useEffect(() => {
    if (!idUserActual) return;
    fetch(`http://localhost:4000/chats/${idUserActual}`)
      .then((res) => res.json())
      .then((data) => setChats(data));
  }, [idUserActual]);

  const abrirChat = (idChat) => {
    router.push(`/chat?id=${idChat}`);
  };

  const agregarChat = (nuevo) => setChats((prev) => [...prev, nuevo]);

  return (
    <div className="fondo">
      <ChatList chats={chats} onSeleccionar={abrirChat} />
      <div className="chatArriba">
        <NuevoChatPopup idUserActual={idUserActual} onCreado={agregarChat} />
        <NuevoGrupoPopup idUserActual={idUserActual} onCreado={agregarChat} />
      </div>
    </div>
  );
}