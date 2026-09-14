app.get("/mensajes/:idChat", async (req, res) => {
  const { idChat } = req.params;
  const [rows] = await pool.query(
    "SELECT id_mensaje, id_chat, id_user, contenido, fecha_hora FROM Mensajes WHERE id_chat = ? ORDER BY fecha_hora ASC",
    [idChat]
  );
  res.json(rows);
});
