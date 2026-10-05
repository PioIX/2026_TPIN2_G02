const express = require("express");
const router = express.Router();
const { realizarQuery } = require("../modulos/mysql");

router.get("/mensajes/:idChat", async (req, res) => {
  const { idChat } = req.params;
  const rows = await realizarQuery(
    `SELECT m.id_mensaje, m.id_chat, m.id_user, m.contenido, m.fecha_hora, u.username 
    FROM Mensajes m
    INNER JOIN Usuarios u ON u.id_user = m.id_user
    WHERE m.id_chat = ? 
    ORDER BY m.fecha_hora ASC`,
    [idChat]
  );
  res.json(rows);
});

router.post("/mensajes", async (req, res) => {
  const { id_chat, id_user, contenido } = req.body;
  const fecha_hora = new Date();

  const resultado = await realizarQuery(
    "INSERT INTO Mensajes (id_chat, id_user, contenido, fecha_hora) VALUES (?, ?, ?, ?)",
    [id_chat, id_user, contenido, fecha_hora]
  );

  res.json({ id_mensaje: resultado.insertId, id_chat, id_user, contenido, fecha_hora });
});

module.exports = router;