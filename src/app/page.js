import Image from "next/image";
import styles from "./page.module.css";
import Chat from "./components/chats";
export default function Home() {
  return (
    <div>
      <pfp/>
      <Chat/> 
      <Chat/>
      <Chat/>
      <Chat/>
      
    </div>
  );
}
          