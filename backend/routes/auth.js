const express = require("express");
const router = express.Router();
const { realizarQuery } = require("../modulos/mysql");

router.post("/login", async (req, res) => {
  const { mail, contra } = req.body;
  const rows = await realizarQuery(
    "SELECT id_user, username, mail, foto FROM Usuarios WHERE mail = ? AND contra = ?",
    [mail, contra]
  );

  if (rows.length === 0) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }
  res.json(rows[0]);
});

router.post("/register", async (req, res) => {
  const { username, mail, contra } = req.body;

  const existentes = await realizarQuery("SELECT id_user FROM Usuarios WHERE mail = ?", [mail]);
  if (existentes.length > 0) {
    return res.status(400).json({ error: "Ese mail ya está registrado" });
  }

  const resultado = await realizarQuery(
    "INSERT INTO Usuarios (username, mail, contra, foto) VALUES (?, ?, ?, NULL)",
    [username, mail, contra]
  );

  res.json({ id_user: resultado.insertId, username, mail });
});

module.exports = router;