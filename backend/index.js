require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mensajesRoutes = require("./routes/mensajes");
app.use(mensajesRoutes);

const authRoutes = require("./routes/auth");
app.use(authRoutes);

app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000/");
});