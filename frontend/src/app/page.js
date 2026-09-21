import Image from "next/image";
import styles from "./page.module.css";
import Chat from "./components/chats";
import Pfp from "./components/pfp";
import PresentChat from "./components/presentChat";
export default function Home() {
  return (
    <div className="fondo">
      <div className="chatList">
        <Chat/> 
        <Chat/>
        <Chat/>
        <Chat/>
      </div>
      <div className="chatArriba">
        <PresentChat></PresentChat>
        <div></div>
      </div>
    </div>
  );
}
          