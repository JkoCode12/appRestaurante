//Express para agregar las rutas
const express = require("express");
const router = express.Router();


//Usuario controller para los métodos definidos
const userController = require("../controllers/userController");

router.get("/",userController.get);

router.get("/:id",userController.getExiste);

router.post("/login", userController.login);

router.post("/registrar", userController.register);

router.post("/registrarRol", userController.register);

module.exports = router;