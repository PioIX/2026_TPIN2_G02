"use client"
import Image from "next/image";

export default function Chat({ nombre, descripcion, foto }) {
  return (
    <div className="chat">
      <Image src={foto || "/globe.svg"} width={55} height={55} alt="" />
      <div className="chatPre">
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
      </div>
    </div>
  );
}

