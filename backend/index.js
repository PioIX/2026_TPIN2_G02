app.get("/mensajes/:idChat", async (req, res) => {
  const { idChat } = req.params;
  const [rows] = await pool.query(
    "SELECT id_mensaje, id_chat, id_user, contenido, fecha_hora FROM Mensajes WHERE id_chat = ? ORDER BY fecha_hora ASC",
    [idChat]
  );
  res.json(rows);
});

app.post("/mensajes", async (req, res) => {
  const { id_chat, id_user, contenido } = req.body;
  const fecha_hora = new Date();

  const [resultado] = await pool.query(
    "INSERT INTO Mensajes (id_chat, id_user, contenido, fecha_hora) VALUES (?, ?, ?, ?)",
    [id_chat, id_user, contenido, fecha_hora]
  );

  res.json({ id_mensaje: resultado.insertId, id_chat, id_user, contenido, fecha_hora });
});
