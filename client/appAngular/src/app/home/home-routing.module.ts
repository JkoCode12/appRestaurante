import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path:'home/acerca-de',component: AcercaDeComponent,
  canActivate: [AuthGuard],
  data: {
    roles: ['ADMIN', 'USER', 'MESERO'],
  },
},
{
  path: '',
  component: InicioComponent,
  canActivate: [AuthGuard],
  data: {
    roles: ['ADMIN', 'USER', 'MESERO'],
  },
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }