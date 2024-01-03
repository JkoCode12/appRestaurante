import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'platillo-all',
  templateUrl: './platillo-all.component.html',
  styleUrls: ['./platillo-all.component.css']
})
export class PlatilloAllComponent implements AfterViewInit {
  datos:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<PlatilloAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fecha','nombre', 'categoria','descripcion','restaurantes','precio', 'acciones'];

  constructor(private router: Router,
    private route: ActivatedRoute,private gService:GenericService) {
    
  }

  ngAfterViewInit(): void {
   
    this.listaPlatillos();
  }
  listaPlatillos() {
    this.gService
      .list('platillo/')
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

  actualizarPlatillo(id: number) {
    this.router.navigate(['/platillo/update', id], {
      relativeTo: this.route,
    });
  }
 
  crearPlatillo() {
    this.router.navigate(['/platillo/create'], {
      relativeTo: this.route,
    });
  }

  onBack() {
    this.router.navigate(['/']);
  }

}
