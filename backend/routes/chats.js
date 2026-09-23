const express = require("express");
const router = express.Router();
const { realizarQuery } = require("../modulos/mysql");

router.get("/chats/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const rows = await realizarQuery(
    `SELECT c.id_chat, c.nombre, c.descripcion, c.foto, c.es_grupo
     FROM Chats c
     JOIN chat_participantes cp ON cp.id_chat = c.id_chat
     WHERE cp.id_user = ?`,
    [idUser]
  );
  res.json(rows);
});

module.exports = router;
