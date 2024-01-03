import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

  await prisma.restaurante.create({
    data: {
      nombre:'Sucursal Alajuela',
      inicial:'A',
      direccion:'La Agonía, 100mts sur de plaza real',
      telefono:'24242424'
    }
  });
  await prisma.restaurante.create({
    data: {
      nombre:'Sucursal Heredia',
      inicial:'H',
      direccion:'Heredia Centro, 50mts sur de la Universidad Nacional',
      telefono:'24242425'
    }
  });
  await prisma.restaurante.create({
    data: {
      nombre:'Sucursal SanJose',
      inicial:'S',
      direccion:'Sabana Sur, perpendicular a la Sala Constitucional',
      telefono:'24242426'
    }
  });









  await prisma.usuario.create({
    data: {
      nombre:'Jorge21',
      email:'jduran@auraportal.com',
      password:'$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO',
      direccion:'Coyol de Alajuela, 50mts sur de entrada calle la margarita',
      role:'USER',
      restaurante : {
        connect:{
          id:1
        }
      }
    }
  });  
  await prisma.usuario.create({
    data: {
      nombre:'Jorge22',
      email:'jduran@auraquantic.com',
      password:'$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO',
      direccion:'Coyol de Alajuela, 50mts sur de entrada calle la margarita',
      role:'ADMIN',
      restaurante : {
        connect:{
          id:2
        }
      }
    }
  });  
  await prisma.usuario.create({
    data: {
      nombre:'Jostin22',
      email:'jrodriguez@auraquantic.com',
      password:'$2b$10$1BaQqXuZYNLDAC42PY5fN.ufSOKjApmjkaZrQUYf7ms71PaS1mASO',
      direccion:'Coyol de Alajuela, 50mts sur de entrada calle la margarita',
      role:'MESERO',
      restaurante : {
        connect:{
          id:2
        }
      }
    }
  });  







  await prisma.categoria.create({
    data: {
      descripcion:'Platos de verdura',
    }
  });
  await prisma.categoria.create({
    data: {
      descripcion:'Platos de pasta',
    }
  });
  await prisma.categoria.create({
    data: {
      descripcion:'Pizzas',
    }
  });
  await prisma.categoria.create({
    data: {
      descripcion:'Postres',
    }
  });





  await prisma.platillo.create({
    data: {
      nombre:'Bagna Cauda',
      descripcion:'Sopa caliente típica de Piamonte hecha con verduras, quesos y anchoas. ',
      precio:1000,
      categoria : {
        connect:{
          id:1
        }
      },
      ingredientes: '',
      restaurantes:{
        connect:[{id:1},{id:2},{id:3}]
      }, 
    }
  });
  await prisma.platillo.create({
    data: {
      nombre:'Gelato',
      descripcion:'Uno de los postres tradicionales en toda Italia es el gelato (helado típico italiano), Está elaborado con una base de 3,25% de grasa láctea, leche entera y azúcar, pudiendo incluir frutas, frutos secos, chocolate, huevos, café, u otros ingredientes frescos en función del sabor específico que se desea obtener',
      precio:2000,
      categoria : {
        connect:{
          id:4
        }
      },
      ingredientes: '',
      restaurantes:{
        connect:[{id:2}]
      }, 
    }
  });
  await prisma.platillo.create({
    data: {
      nombre:'Margherita',
      descripcion:'No hay mucho que decir. Es la reina de la mesa. Ya sea en su simple versión con mozzarella fiordilatte o mozzarella de bufala (en este caso se llamará BUFALINA), la pizza margherita es sin duda la pizza preferida por los italianos.Además de la mozzarella, los otros ingredientes son tomate, aceite y albahaca, combinados de forma artesanal por los pizzeros (pizzaioli) italianos.',
      precio:8000,
      categoria : {
        connect:{
          id:3
        }
      },
      ingredientes: '',
      restaurantes:{
        connect:[{id:1}]
      }, 
    }
  });




  await prisma.estadoPedidos.create({
    data: {
      descripcion:"Registrado",
    }
  });
  await prisma.estadoPedidos.create({
    data: {
      descripcion:"En proceso",
    }
  });
  await prisma.estadoPedidos.create({
    data: {
      descripcion:"Pendiente",
    }
  });
  await prisma.estadoPedidos.create({
    data: {
      descripcion:"Entregado",
    }
  });
  await prisma.estadoPedidos.create({
    data: {
      descripcion:"Por pagar",
    }
  });





  await prisma.estadoMesas.create({
    data: {
      descripcion:"Libre",
    }
  });
  await prisma.estadoMesas.create({
    data: {
      descripcion:"Reservada",
    }
  });
  await prisma.estadoMesas.create({
    data: {
      descripcion:"Ocupada",
    }
  });
  await prisma.estadoMesas.create({
    data: {
      descripcion:"Pedido registrado",
    }
  });
  await prisma.estadoMesas.create({
    data: {
      descripcion:"Por pagar",
    }
  });
  await prisma.estadoMesas.create({
    data: {
      descripcion:"Inactiva",
    }
  });



  await prisma.mesa.create({
    data: {
      codigo:'A1',
      numMesa:1,
      capacidad:6,
      estado : {
        connect:{
          id:1
        }
      },
      restaurante : {
        connect:{
          id:1
        }
      }
    }
  });

  await prisma.mesa.create({
    data: {
      codigo:'A2',
      numMesa:2,
      capacidad:4,
      estado : {
        connect:{
          id:2
        }
      },
      restaurante : {
        connect:{
          id:1
        }
      }
    }
  });

  await prisma.mesa.create({
    data: {
      codigo:'A3',
      numMesa:3,
      capacidad:6,
      estado : {
        connect:{
          id:3
        }
      },
      restaurante : {
        connect:{
          id:1
        }
      }
    }
  });
  await prisma.mesa.create({
    data: {
      codigo:'A4',
      numMesa:4,
      capacidad:4,
      estado : {
        connect:{
          id:4
        }
      },
      restaurante : {
        connect:{
          id:1
        }
      }
    }
  });
  await prisma.mesa.create({
    data: {
      codigo:'A5',
      numMesa:5,
      capacidad:6,
      estado : {
        connect:{
          id:5
        }
      },
      restaurante : {
        connect:{
          id:1
        }
      }
    }
  });
  await prisma.mesa.create({
    data: {
      codigo:'A6',
      numMesa:6,
      capacidad:4,
      estado : {
        connect:{
          id:6
        }
      },
      restaurante : {
        connect:{
          id:1
        }
      }
    }
  });
  await prisma.mesa.create({
    data: {
      codigo:'H1',
      numMesa:1,
      capacidad:6,
      estado : {
        connect:{
          id:1
        }
      },
      restaurante : {
        connect:{
          id:2
        }
      }
    }
  });

  await prisma.mesa.create({
    data: {
      codigo:'H2',
      numMesa:2,
      capacidad:4,
      estado : {
        connect:{
          id:2
        }
      },
      restaurante : {
        connect:{
          id:2
        }
      }
    }
  });

  await prisma.mesa.create({
    data: {
      codigo:'H3',
      numMesa:3,
      capacidad:6,
      estado : {
        connect:{
          id:3
        }
      },
      restaurante : {
        connect:{
          id:2
        }
      }
    }
  });
  await prisma.mesa.create({
    data: {
      codigo:'H4',
      numMesa:4,
      capacidad:4,
      estado : {
        connect:{
          id:4
        }
      },
      restaurante : {
        connect:{
          id:2
        }
      }
    }
  });
  await prisma.mesa.create({
    data: {
      codigo:'H5',
      numMesa:5,
      capacidad:6,
      estado : {
        connect:{
          id:5
        }
      },
      restaurante : {
        connect:{
          id:2
        }
      }
    }
  });
  await prisma.mesa.create({
    data: {
      codigo:'H6',
      numMesa:6,
      capacidad:6,
      estado : {
        connect:{
          id:6
        }
      },
      restaurante : {
        connect:{
          id:2
        }
      }
    }
  });



  await prisma.pedido.create({
    data: {
      usuario : {
        connect:{
          id:1
        }
      },
      platillos : {
        createMany: {
          data: [
            { cantidad: 2, total:2000, platilloId: 1 },
            { cantidad: 8, total:8000, platilloId: 2 }
          ]
        }
      },
      mesa : {
        connect:{
          id:1
        }
      },
      estado : {
        connect:{
          id:1
        }
      },
      comentarios:'Sin albondigas',
      descuento:15,
      total:10000
    }
  });


  await prisma.pedido.create({
    data: {
      usuario : {
        connect:{
          id:1
        }
      },
      platillos : {
        createMany: {
          data: [
            { cantidad: 4, total:8000, platilloId: 2 },
            { cantidad: 2, total:16000, platilloId: 3 }
          ]
        }
      },
      mesa : {
        connect:{
          id:8
        }
      },
      estado : {
        connect:{
          id:2
        }
      },
      comentarios:'Sin queso',
      descuento:1,
      total:24000
    }
  });





  await prisma.opcionPago.create({
    data: {
      descripcion:"Efectivo",
    }
  });
  await prisma.opcionPago.create({
    data: {
      descripcion:"Tarjeta",
    }
  });
  await prisma.opcionPago.create({
    data: {
      descripcion:"Ambas",
    }
  });




  await prisma.factura.create({
    data: {
      pedido : {
        connect:{
          id:1
        }
      },
      opcionPago : {
        connect:{
          id:1
        }
      },
      impuesto:1950,
      total:16950
    }
  });
}





main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
