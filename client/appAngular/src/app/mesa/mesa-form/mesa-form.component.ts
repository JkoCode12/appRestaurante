import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject,takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-mesa-form',
  templateUrl: './mesa-form.component.html',
  styleUrls: ['./mesa-form.component.css']
})
export class MesaFormComponent implements OnInit{
  titleForm:string='Crear Mesa';
  destroy$: Subject<boolean> = new Subject<boolean>();
  estadosList:any;
  restaurantesList:any;
  mesaInfo:any;
  respMesa:any;
  submitted = false;
  mesaForm:FormGroup;
  idMesa: number = 0;
  isCreate:boolean=true;

  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute) {
      this.formularioReactive();
      this.listaEstados();
      this.listaRestaurantes();
    
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idMesa=params['id'];
      if(this.idMesa!=undefined){
        this.isCreate=false;
        
         //Obtener mesa a actualizar del API
         this.gService.get('mesa',this.idMesa).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.mesaInfo=data;
          this.titleForm="Actualizar Mesa "+this.mesaInfo.codigo;
          this.mesaForm.setValue({
            id:this.mesaInfo.id,
            capacidad:this.mesaInfo.capacidad,
            estadoId:this.mesaInfo.estado.id,
            restauranteId:this.mesaInfo.restaurante.id
          })
         });
      }

    });
   
       

  
  }
  //Crear Formulario
  formularioReactive(){
    //[null, Validators.required]
    this.mesaForm=this.fb.group({
      id:[null,null],
      

      capacidad:[null, Validators.compose([Validators.required, 
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      estadoId:[null, Validators.required],
      restauranteId:[null, Validators.required]
    });
   
  }
  listaEstados() {
    this.estadosList = null;
    this.gService
      .list('estado')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.estadosList = data;
      });
  }
  
  
  listaRestaurantes() {
    this.restaurantesList = null;
    this.gService
      .list('restaurante')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.restaurantesList = data;
      });
  }
 
  public errorHandling = (control: string, error: string) => {
    return this.mesaForm.controls[control].hasError(error);
  };
  //Crear Videojueogo
  crearMesa(): void {
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.mesaForm.invalid){
      return;
    }

    //Accion API create enviando toda la informacion del formulario
    this.gService.create('mesa',this.mesaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respMesa=data;
      this.router.navigate(['/mesa/all'],{
        queryParams: {create:'true'}
      });
    });
  
  }
  //Actualizar Mesa
  actualizarMesa(){
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.mesaForm.invalid){
      return;
    } 
    
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('mesa',this.mesaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respMesa=data;
      this.router.navigate(['/mesa/all'],{
        queryParams: {update:'true'}
      });
    });
  }
  onReset() {
    this.submitted = false;
    this.mesaForm.reset();
  }
  onBack() {
    this.router.navigate(['/mesa/all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
