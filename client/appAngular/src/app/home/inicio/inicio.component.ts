
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  hide = true;
  usuario: any;
  roles: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isAutenticated: boolean;
  currentUser: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private cartService:CartService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      role: [''],
    });
    this.getRoles();
  }
  ngOnInit(): void {
    //Valores de prueba
 /*  this.isAutenticated=true;
  let user = { 
    name:"Tom", 
    email:"tHanks@prueba.com" 
 }; 
  this.currentUser=user; */
  //Subscripción a la información del usuario actual
  this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  
  //Subscripción al booleano que indica si esta autenticado
  this.authService.isAuthenticated.subscribe(
    (valor) => (this.isAutenticated = valor)
  );
}

Siguiente(id: number,role){
  this.cartService.setRestaurante(id);
  if(role=='USER')
    this.router.navigate(['platillo/']);
  else
    this.router.navigate(['mesa/']);
}



  getRoles() {
    this.gService
      .list('restaurante/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.roles = data;
        console.log( this.roles);
      });
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}
