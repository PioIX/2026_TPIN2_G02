const express = require("express");
const router = express.Router();
const multer = require("multer");
const { realizarQuery } = require("../modulos/mysql");

const upload = multer({ dest: "uploads/" });

router.post("/register", upload.single("foto"), async (req, res) => {
  const { username, mail, contra } = req.body;
  const foto = req.file ? req.file.filename : null;

  const existentes = await realizarQuery("SELECT id_user FROM Usuarios WHERE mail = ?", [mail]);
  if (existentes.length > 0) {
    return res.status(400).json({ error: "Ese mail ya está registrado" });
  }

  const resultado = await realizarQuery(
    "INSERT INTO Usuarios (username, mail, contra, foto) VALUES (?, ?, ?, ?)",
    [username, mail, contra, foto]
  );

  res.json({ id_user: resultado.insertId, username, mail, foto });
});

module.exports = router;
