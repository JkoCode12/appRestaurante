//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const pedidoController = require("../controllers/pedidoController");

//Definición de rutas para pedidos
router.get("/", pedidoController.get);



router.get("/:id", pedidoController.getById);

router.get("/mesa/:idMesa", pedidoController.getByMesa);

module.exports = router;