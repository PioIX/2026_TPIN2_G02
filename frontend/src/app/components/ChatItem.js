"use client"
import Image from "next/image";

export default function Chat({ chat, onClick }) {
  return (
    <div className="chat" onClick={()=>onClick(chat.id_chat)}>
      <Image src={foto || "/globe.svg"} width={55} height={55} alt="" />
      <div className="chatPre">
        <h3>{chat.nombre}</h3>
        <p>{chat.descripcion}</p>
      </div>
    </div>
  );
}

