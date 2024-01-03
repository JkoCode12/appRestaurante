//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const mesaController = require("../controllers/mesaController");

//Definición de rutas para generos
router.get("/", mesaController.get);

router.post("/", mesaController.create);

router.get("/:id", mesaController.getById);

router.get("/rest/:idRestaurante",mesaController.getByRestaurante);

router.put("/:id", mesaController.update);

module.exports = router;