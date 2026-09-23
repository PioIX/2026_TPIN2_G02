const express = require("express");
const router = express.Router();
const { realizarQuery } = require("../modulos/mysql");

router.get("/chats/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const rows = await realizarQuery(
    `SELECT c.id_chat, c.nombre, c.descripcion, c.foto, c.es_grupo
     FROM Chats c
     INNER SJOIN chat_participantes cp ON cp.id_chat = c.id_chat
     WHERE cp.id_user = ?`,
    [idUser]
  );
  res.json(rows);
});

router.post("/chats", async (req, res) => {
  const { nombre, descripcion, es_grupo, idUserCreador } = req.body;

  const resultado = await realizarQuery(
    "INSERT INTO Chats (nombre, descripcion, es_grupo) VALUES (?, ?, ?)",
    [nombre, descripcion, es_grupo]
  );
  await realizarQuery(
    "INSERT INTO chat_participantes (id_chat, id_user) VALUES (?, ?)",
    [resultado.insertId, idUserCreador]
  );

  res.json({ id_chat: resultado.insertId, nombre, descripcion, es_grupo });
});
 

module.exports = router;
