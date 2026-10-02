"use client"
import ChatItem from "./ChatItem";

export default function ChatList({ chats, onSeleccionar }) {
  return (
    <div className="chatList">
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