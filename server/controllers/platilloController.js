const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let idRestaurante = parseInt(request.params.idRestaurante);
  var platillos = await prisma.platillo.findMany({
    
    orderBy: {
      nombre: 'asc',
    },
    include:{
      categoria: true,
      restaurantes: {
        select:{
          id:true,
          nombre:true},
          
      },
    },

  });

  
  response.json(platillos);
}; 
//Obtener listado
module.exports.getByRestaurante = async (request, response, next) => {
  let idRestaurante = parseInt(request.params.idRestaurante);
  if (idRestaurante==0)
    response.json(''); 
    else{
  var platillos = await prisma.platillo.findMany({
    
    orderBy: {
      nombre: 'asc',
    }, 
    include:{
      categoria: true,
      restaurantes: {
        select:{
          id:true,},
          where: { id: idRestaurante }, 
      },
    },

  });
  platillos=filtrarPlatillos(platillos);
  
  response.json(platillos);}
}; 

function filtrarPlatillos(platillos){
  
  platillos.forEach(function(currentValue, index, arr){

    if(platillos[index].restaurantes.length==0){
      platillos.splice(index, index); 
      eliminado=true  
      platillos=filtrarPlatillos(platillos);
     }
    }   
    )
  
  return platillos;
}

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const platillo = await prisma.platillo.findUnique({
    where: { id: id },
    include: {
      categoria: true,

      restaurantes:true
    },
  });
  
  response.json(platillo);
};


//Crear un platillo
module.exports.create = async (request, response, next) => {
  let platillo = request.body;
  const newplatillo = await prisma.platillo.create({
    data: {
      nombre: platillo.nombre,
      descripcion: platillo.descripcion,
      precio: platillo.precio,
      estado: platillo.publicar,
      categoria: {
        //categorias tiene que ser {id:valor}
        connect: await prisma.categoria.findUnique({
          where: {
            id: platillo.categoriaId,
          },
          select:
          {
            id:true
          }
        })
      },
      restaurantes:{
      
        connect:platillo.restaurantes
      }
      /* ingredientes: {
        //categorias tiene que ser {id:valor}
        connect: platillo.ingredientes,
      }, */
    },
  });
  response.json(newplatillo);
};
//Actualizar un platillo
module.exports.update = async (request, response, next) => {
  let platillo = request.body;
  let idplatillo = parseInt(request.params.id);
  //Obtener platillo viejo
  const platilloViejo = await prisma.platillo.findUnique({
    where: { id: idplatillo },
    include: {
      categoria: {
        select:{
          id:true
        }
      },
      restaurantes: {
        select:{
          id:true
        }
      }
    }
  });

  const newplatillo = await prisma.platillo.update({
    where: {
      id: idplatillo,
    },
    data: {
      nombre: platillo.nombre,
      descripcion: platillo.descripcion,
      precio: platillo.precio,
      estado: platillo.publicar,
      categoria: {
        //categorias tiene que ser {id:valor}
        connect: await prisma.categoria.findUnique({
          where: {
            id: platillo.categoriaId,
          },
          select:
          {
            id:true
          }
        })
      },
      restaurantes:{
        disconnect:platilloViejo.restaurantes,
        connect:platillo.restaurantes
      },
      /* ingredientes: {
        //categorias tiene que ser {id:valor}
        disconnect:platilloViejo.ingredientes,
        connect: platillo.ingredientes,
      }, */
      restaurantes: {
        //categorias tiene que ser {id:valor}
        disconnect:platilloViejo.restaurantes,
        connect: platillo.restaurantes,
      },
    },
  });
  response.json(newplatillo);
};