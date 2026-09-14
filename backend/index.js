js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post("/login", async (req, res) => {
  const { mail, contra } = req.body;
  const [rows] = await pool.query(
    "SELECT id_user, username, mail, foto FROM Usuarios WHERE mail = ? AND contra = ?",
    [mail, contra]
  );

  if (rows.length === 0) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }
  res.json(rows[0]);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
