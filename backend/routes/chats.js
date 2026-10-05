const express = require("express");
const router = express.Router();
const { realizarQuery } = require("../modulos/mysql");

router.get("/chats/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const rows = await realizarQuery(
    `SELECT c.id_chat, c.nombre, c.descripcion, c.foto, c.es_grupo
     FROM Chats c
     INNER JOIN Chat_participantes cp ON cp.id_chat = c.id_chat
     WHERE cp.id_user = ?`,
    [idUser]
  );

  // Esto es para que en los chats individuales se muestre el nombre y la foto del otro participante
  for (const chat of rows) {
    if (!chat.es_grupo) {
      const otros = await realizarQuery(
        `SELECT u.username, u.foto
         FROM Usuarios u
         INNER JOIN Chat_participantes cp ON cp.id_user = u.id_user
         WHERE cp.id_chat = ? AND cp.id_user != ?`,
        [chat.id_chat, idUser]
      );
      if (otros.length > 0) {
        chat.nombre = otros[0].username;
        chat.foto = otros[0].foto;
      }
    }
  }

  res.json(rows);
});

// Crear chat individual o grupal, según si viene "mails" (grupo) u "otroMail" (individual)
router.post("/chats", async (req, res) => {
  const { otroMail, mails, nombre, foto, idUserCreador, esGrupo } = req.body;

  if (esGrupo) {
    // Chat grupal
    const idsEncontrados = [];
    for (const mail of mails) {
      const encontrados = await realizarQuery("SELECT id_user FROM Usuarios WHERE mail = ?", [mail]);
      if (encontrados.length === 0) {
        return res.status(404).json({ error: `No existe un usuario con el mail ${mail}` });
      }
      idsEncontrados.push(encontrados[0].id_user);
    }

    const resultado = await realizarQuery(
      "INSERT INTO Chats (nombre, descripcion, foto, es_grupo) VALUES (?, ?, ?, ?)",
      [nombre, null, foto || null, true]
    );
    const idChat = resultado.insertId;

    // esto es para no insertar al creador 2 veces
    const participantes = [...new Set([idUserCreador, ...idsEncontrados])];
    for (const idUser of participantes) {
      await realizarQuery(
        "INSERT INTO Chat_participantes (id_chat, id_user) VALUES (?, ?)",
        [idChat, idUser]
      );
    }

    return res.json({ id_chat: idChat, nombre, descripcion: null, foto: foto || null, es_grupo: true });
  }

  // Chat individual
  const encontrados = await realizarQuery("SELECT id_user, username, foto FROM Usuarios WHERE mail = ?", [otroMail]);
  if (encontrados.length === 0) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  const otroUsuario = encontrados[0];

  // Esto es para chequear si ya existe un chat individual entre estos dos usuarios
  const chatExistente = await realizarQuery(
    `SELECT c.id_chat, c.nombre, c.descripcion, c.foto, c.es_grupo
     FROM Chats c
     INNER JOIN Chat_participantes cp1 ON cp1.id_chat = c.id_chat AND cp1.id_user = ?
     INNER JOIN Chat_participantes cp2 ON cp2.id_chat = c.id_chat AND cp2.id_user = ?
     WHERE c.es_grupo = FALSE`,
    [idUserCreador, otroUsuario.id_user]
  );

  if (chatExistente.length > 0) {
    return res.json(chatExistente[0]); // devolvemos el chat que ya existía para que no creé otro
  }

  const resultado = await realizarQuery(
    "INSERT INTO Chats (nombre, descripcion, foto, es_grupo) VALUES (?, ?, ?, ?)",
    [otroUsuario.username, null, otroUsuario.foto, false]
  );
  const idChat = resultado.insertId;

  await realizarQuery("INSERT INTO Chat_participantes (id_chat, id_user) VALUES (?, ?)", [idChat, idUserCreador]);
  await realizarQuery("INSERT INTO Chat_participantes (id_chat, id_user) VALUES (?, ?)", [idChat, otroUsuario.id_user]);

  res.json({ id_chat: idChat, nombre: otroUsuario.username, descripcion: null, foto: otroUsuario.foto, es_grupo: false });
});
 

module.exports = router;
