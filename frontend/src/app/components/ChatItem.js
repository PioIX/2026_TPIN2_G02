"use client"
import { useState } from "react";
import Image from "next/image";
import styles from "../styles.module.css";

export default function Chat({ chat, onClick }) {
  const [error, setError] = useState(false);
  return (
    <div className={styles.chatItem} onClick={()=>onClick(chat.id_chat)}>
      <Image
        src={error || !chat.foto ? "/globe.svg" : chat.foto}
        width={55}
        height={55}
        alt=""
        unoptimized
        onError={() => setError(true)}
      />
      <div className={styles.chatPre}>
        <h3>{chat.nombre}</h3>
        <p>{chat.descripcion}</p>
      </div>
    </div>
  );
}

