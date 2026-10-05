"use client"
import ChatItem from "./ChatItem";
import styles from "../styles.module.css";

export default function ChatList({ chats, onSeleccionar }) {
  return (
    <div className={styles.chatList}>
      {chats.length === 0 ? (
        <p>No tenés chats todavía.</p>
      ) : (
        chats.map((chat) => (
          <ChatItem key={chat.id_chat} chat={chat} onClick={onSeleccionar} />
        ))
      )}
    </div>
  );
}