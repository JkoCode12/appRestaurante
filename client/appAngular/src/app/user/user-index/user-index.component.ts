import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css'],
})
export class UserIndexComponent implements OnInit {
  authService: any;
  currentUser: any;
  isAutenticated: any;
   
  constructor(
    private router: Router, 
    private route: ActivatedRoute) {
  

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

    
    this.router.navigate(['/usuario/'], { relativeTo: this.route });
  }
  onBack() {
    this.router.navigate(['/usuario/all']);
  }
}
