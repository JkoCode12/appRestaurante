import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ 
  selector: 'mesa-all',
  templateUrl: './mesa-all.component.html',
  styleUrls: ['./mesa-all.component.css'] 
})
export class MesaAllComponent implements AfterViewInit {
  datos:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<MesaAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codigo','capacidad', 'estado','restaurantes','acciones'];

  constructor(private router: Router,
    private route: ActivatedRoute,private gService:GenericService) {
    
  }

  ngAfterViewInit(): void {
   
    this.listaMesas();
  }
  listaMesas() {
    this.gService
      .list('mesa/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  actualizarMesa(id: number) {
    this.router.navigate(['/mesa/update', id], {
      relativeTo: this.route,
    });
  }
 
  crearMesa() {
    this.router.navigate(['/mesa/create'], {
      relativeTo: this.route,
    });
  }

  onBack() {
    this.router.navigate(['/']);
  }

}
