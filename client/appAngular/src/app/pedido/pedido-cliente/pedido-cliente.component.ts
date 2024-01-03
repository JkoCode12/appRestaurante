import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';

import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedido-cliente',
  templateUrl: './pedido-cliente.component.html',
  styleUrls: ['./pedido-cliente.component.css']
})
export class PedidoClienteComponent implements OnInit {

  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  //Tabla
  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal','acciones'];
  dataSource = new MatTableDataSource<any>();
  currentUser: any;
  constructor(
    private cartService: CartService,
    private authService: AuthenticationService,
    private gService: GenericService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  
    this.cartService.currentDataCart$.subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
    this.total=this.cartService.getTotal();
  }
  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total=this.cartService.getTotal();

  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total=this.cartService.getTotal();

  }
  registrarOrden() {
   if(this.cartService.getItems!=null){
    //Obtener todo lo necesario para crear la orden
    let itemsCarrito=this.cartService.getItems;
    let detalles=itemsCarrito.map(
      x=>({
        ['platilloId']: x.idItem,
        ['cantidad']: x.cantidad
      })
    );
    //Datos para el API
    let infoOrden={
      'fechaPedido':new Date(this.fecha),
      'platillos':detalles
    }
    this.gService
    .create('pedido',infoOrden)
    .subscribe((respuesta:any)=>{

        this.cartService.deleteCart();
        this.total=this.cartService.getTotal();
        console.log(respuesta);
      });
    

   }else{

   }
  }
}

