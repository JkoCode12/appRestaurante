const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const estados = await prisma.estadoMesas.findMany({
    orderBy: {
      descripcion: "asc",
    },
  });
  response.json(estados);
};
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const estado = await prisma.estadoMesas.findUnique({
    where: {
      id: id,
    }
  });
  response.json(estado);
};