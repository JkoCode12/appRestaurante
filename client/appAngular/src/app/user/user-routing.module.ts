import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { UserAllComponent } from './user-all/user-all.component';
import { UserCreateComponent } from './user-create/user-create.component'; 
import { UserIndexComponent } from './user-index/user-index.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: 'usuario/all', component: UserAllComponent,
  canActivate: [AuthGuard],
  data: {
    roles: ['ADMIN'],
  }, },
  {
    path: 'usuario',
    component: UserIndexComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN'],
    },
    children: [
      { path: 'registrar', component: UserCreateComponent },
      { path: 'registrarRol', component: UserCreateComponent ,
      canActivate: [AuthGuard],
      data: {
        roles: ['ADMIN'],
      },
    },
      { path: 'login', component: UserLoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
