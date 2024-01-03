import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartService } from 'src/app/share/cart.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'platillo-index',
  templateUrl: './platillo-index.component.html',
  styleUrls: ['./platillo-index.component.css']
})
export class PlatilloIndexComponent implements AfterViewInit {
  datos:any;
  rest:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<PlatilloAllItem>;
  dataSource= new MatTableDataSource<any>();
  idRestaurante: number = 0;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'precio',"categoria","ubicaciones","ver"];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private cartService:CartService,
    private gService:GenericService,
    private noti: NotificacionService,

    
    ) {
    
  }

  ngAfterViewInit(): void {
   this.rest=this.cartService.getRestaurante();
    this.listaPlatillos();
  }
  listaPlatillos() {
    this.route.params.subscribe((params:Params)=>{
      if(this.idRestaurante!=undefined){
         //Obtener Platillo a actualizar del API
         this.gService.get('platillo/rest',this.cartService.getRestaurante()).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.datos = data;
          this.dataSource= new MatTableDataSource(this.datos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
         });
      }
    });
    
  }

  listaRestaurante() {
    this.gService
      .list('restaurante/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
       // console.log(data);
        this.listaRestaurante = data;
      });
  }

  verPlatillo(idRestaurante:number,id: number) {
    this.router.navigate(['/platillo',id], {
      relativeTo: this.route,
    });
  }
  onBack() {
    this.router.navigate(['/platillo']);
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  comprar(id:number){
    this.gService
    .get('platillo/',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      //Agregar videojuego obtenido del API al carrito
      this.cartService.addToCart(data);
      this.noti.mensaje(
        'Usuario',
        'Producto añadido',
        TipoMessage.success
      );
      //Notificar al usuario

    });
  }
}
