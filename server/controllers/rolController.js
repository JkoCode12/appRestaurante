const { PrismaClient, Role } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listRoles = [];
  for (let element in Role) {
    switch (element) {
      case Role.ADMIN:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Administrador",
        });
        break;
        case Role.MESERO:
          listRoles.unshift({  
            ["id"]: element,
            ["nombre"]: "Mesero",
          });
          break;
      case Role.USER:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Usuario",
        });
        break;
      default:
        listRoles.unshift({ ["id"]: Role.USER, ["nombre"]: "Usuario" });
        break;
    }
  }

  response.json(listRoles);
};
module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  let nombre = "";
  switch (Role[id]) {
    case Role.ADMIN:
      nombre = "Administrador";
      break;
    case Role.USER:
      nombre = "Usuario";
      break;
      case Role.MESERO:
      nombre = "Mesero";
      break;
    default:
      nombre = "Usuario";
      break;
  }
  let rol = { ["id"]: Role[id], ["nombre"]: nombre };
  response.json(rol);
};
