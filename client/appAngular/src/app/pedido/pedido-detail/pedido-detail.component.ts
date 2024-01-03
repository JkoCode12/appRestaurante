import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject,takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'pedido-detail',
  templateUrl: './pedido-detail.component.html',
  styleUrls: ['./pedido-detail.component.css']
})
export class PedidoDetailComponent implements OnInit{

  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pedidoInfo:any;
  idPedido: number = 0;
  dataSource= new MatTableDataSource<any>();
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['platillo',"cantidad" ,"precio",'subtotal'];
  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute) {
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idPedido=params['id'];
      if(this.idPedido!=undefined){
         //Obtener Pedido a actualizar del API
         this.gService.get('pedido',this.idPedido).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.pedidoInfo=data;
          this.dataSource= new MatTableDataSource(data.platillos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
         });
      }
    });
  }
  onBack() {
    this.router.navigate(['/pedido']);
  }

}
