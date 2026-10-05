require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const session = require("express-session");
const { realizarQuery } = require("./modulos/mysql");

const app = express();
const PORT = process.env.PORT || 4000;

const sessionMiddleware = session({
  secret: "supersarasa",
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);

app.use(cors());
app.use(express.json());

const mensajesRoutes = require("./routes/mensajes");
app.use(mensajesRoutes);

const authRoutes = require("./routes/auth");
app.use(authRoutes);

const chatsRoutes = require("./routes/chats");
app.use(chatsRoutes);

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});

const io = new Server(server, {
  cors: { origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true },
});

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on("connection", (socket) => {
  const req = socket.request;

  socket.on("joinRoom", (data) => {
    if (req.session.room) socket.leave(req.session.room);
    req.session.room = data.room;
    socket.join(req.session.room);
  });

  socket.on("sendMessage", async (data) => {
    const fechaHora = new Date();
    const resultado = await realizarQuery(
      "INSERT INTO Mensajes (id_chat, id_user, contenido, fecha_hora) VALUES (?, ?, ?, ?)",
      [data.id_chat, data.id_user, data.contenido, fechaHora]
    );
    const usuario = await realizarQuery("SELECT username FROM Usuarios WHERE id_user = ?", [data.id_user]);
    io.to(req.session.room).emit("newMessage", { ...data, id_mensaje: resultado.insertId, username: usuario[0]?.username, fecha_hora: fechaHora,});
  });

  socket.on("disconnect", () => console.log("Disconnect"));
});