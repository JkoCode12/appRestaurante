import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  hide=true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  currentUser: any;
  isAutenticated: boolean;
  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }
  // Definir el formulario con su reglas de validación
  reactiveForm() {
    /*https://angular.io/guide/reactive-forms
   https://angular.io/api/forms/Validators */
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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
    this.mensajes();
  }

  mensajes() {
    let register = false;
    let auth='';
    //Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      register = params['register']==='true' || false;
      auth = params['auth'] || '';
      if (register) {
        this.notificacion.mensaje(
          'Usuario',
          'Registro satisfactorio! Especifique su credenciales para ingresar',
          TipoMessage.success
        );
      }
      if (auth) {
        this.notificacion.mensaje(
          'Usuario',
          'Acceso denegado',
          TipoMessage.warning
        );
      }
    });
   
  }
  onReset() {
    this.formulario.reset();
  }
  submitForm() {
   this.makeSubmit=true;
   //Validación
   if(this.formulario.invalid){
    return;
   }
   this.authService.loginUser(this.formulario.value)
   .subscribe((respuesta:any)=>{
    this.router.navigate(['/']);
   })
  }
  /* Manejar errores de formulario en Angular */

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}