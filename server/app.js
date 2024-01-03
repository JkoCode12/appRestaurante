const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const prism = new PrismaClient();

//--- Archivos de rutas ---
const restRouter = require("./routes/restauranteRoutes");
const generoRouter = require("./routes/categoriaRoutes");
const platilloRouter = require("./routes/platilloRoutes");
const pedidoRouter = require("./routes/pedidoRoutes");
const mesaRouter = require("./routes/mesaRoutes");
const rolRouter = require("./routes/rolRoutes");
const userRouter = require("./routes/userRoutes");
const estadoRouter = require("./routes/estadoRoutes");

// Acceder a la configuracion del archivo .env
dotEnv.config();

// Puero que escucha por defecto 3000 o definido .env
const port = process.env.PORT || 3000;

// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));

// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//---- Definir rutas ---- 
app.use("/restaurante/", restRouter);
app.use("/categoria/", generoRouter);
app.use("/platillo/", platilloRouter);
app.use("/pedido/", pedidoRouter);
app.use("/mesa/", mesaRouter);
app.use("/rol/", rolRouter); 
app.use("/user/", userRouter);
app.use("/estado/", estadoRouter);

// Servidor
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log("Presione CTRL-C para deternerlo\n");
});