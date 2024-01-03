import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
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
    private noti: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
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
submitForm() {
  this.makeSubmit = true;

  if (this.formCreate.invalid) {
    return;
  }

  this.gService
    .get('user', this.formCreate.value.email)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      if (data) {
        this.noti.mensaje(
          'Usuario',
          'Este usuario ya se encuentra registrado',
          TipoMessage.warning
        );
        return;
      } else {
        this.authService
          .createUser(this.formCreate.value)
          .subscribe((respuesta: any) => {
            this.router.navigate(['/usuario/login'], {
              queryParams: { register: 'true' },
            });
          });
        return;
      }
    });
}
  submitForm2() {
    
  this.makeSubmit = true;

  if (this.formCreate.invalid) {
    return;
  }
  this.gService
    .get('user', this.formCreate.value.email)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      if (data) {
        this.noti.mensaje(
          'Usuario',
          'Este usuario ya se encuentra registrado',
          TipoMessage.warning
        );
        return;
      } else {
        this.authService
          .createUser(this.formCreate.value)
          .subscribe((respuesta: any) => {
            this.router.navigate(['/usuario/registrarRol'], {
              queryParams: { register: 'true' },
            });
          });

        return;
      }
    });
  }
  onReset() {
    this.router.navigate(['/usuario/login']);
    this.formCreate.reset();
  }
  onBack() {
    this.router.navigate(['/usuario/all']);
  }
  getRoles() {
    this.gService
      .list('rol')
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
