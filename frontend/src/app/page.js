"use client"

import { useState, useEffect } from "react";
import Chat from "@/components/Chat";
import PresentChat from "@/components/PresentChat";

export default function Home() {
  const [chats, setChats] = useState([]);
  const idUserActual = JSON.parse(localStorage.getItem("usuario"))?.id_user;
  return (
    <div className="fondo">
      <div className="chatList">
       {chats.map((c) => (
          <Chat key={c.id_chat} nombre={c.nombre} descripcion={c.descripcion} foto={c.foto} />
        ))}
      </div>
      <div className="chatArriba">
        <PresentChat />
        <div></div>
      </div>
    </div>
  );
}
          