//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const estadoController = require("../controllers/estadoController");

//Definición de rutas para generos
router.get("/", estadoController.get);

router.get("/:id", estadoController.getById);

module.exports = router;