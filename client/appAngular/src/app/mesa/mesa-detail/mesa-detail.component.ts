import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject,takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'mesa-detail',
  templateUrl: './mesa-detail.component.html',
  styleUrls: ['./mesa-detail.component.css']
})
export class MesaDetailComponent implements OnInit{

  destroy$: Subject<boolean> = new Subject<boolean>();
  mesaInfo:any;
  idMesa: number = 0;

  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute) {
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idMesa=params['id'];
      if(this.idMesa!=undefined){
         //Obtener mesa a actualizar del API
         this.gService.get('mesa',this.idMesa).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.mesaInfo=data;
          
         });
      }
    });
  }
  onBack() {
    this.router.navigate(['/mesa']);
  }

}
