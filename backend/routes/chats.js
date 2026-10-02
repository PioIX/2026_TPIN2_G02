const express = require("express");
const router = express.Router();
const { realizarQuery } = require("../modulos/mysql");

router.get("/chats/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const rows = await realizarQuery(
    `SELECT c.id_chat, c.nombre, c.descripcion, c.foto, c.es_grupo
     FROM Chats c
     INNER JOIN chat_participantes cp ON cp.id_chat = c.id_chat
     WHERE cp.id_user = ?`,
    [idUser]
  );
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

    const participantes = [idUserCreador, ...idsEncontrados];
    for (const idUser of participantes) {
      await realizarQuery(
        "INSERT INTO chat_participantes (id_chat, id_user) VALUES (?, ?)",
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

  const resultado = await realizarQuery(
    "INSERT INTO Chats (nombre, descripcion, foto, es_grupo) VALUES (?, ?, ?, ?)",
    [otroUsuario.username, null, otroUsuario.foto, false]
  );
  const idChat = resultado.insertId;

  await realizarQuery("INSERT INTO chat_participantes (id_chat, id_user) VALUES (?, ?)", [idChat, idUserCreador]);
  await realizarQuery("INSERT INTO chat_participantes (id_chat, id_user) VALUES (?, ?)", [idChat, otroUsuario.id_user]);

  res.json({ id_chat: idChat, nombre: otroUsuario.username, descripcion: null, foto: otroUsuario.foto, es_grupo: false });
});
 

module.exports = router;
