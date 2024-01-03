import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guards/auth.guard';
import { MesaAllComponent } from './mesa-all/mesa-all.component';
import { MesaDetailComponent } from './mesa-detail/mesa-detail.component';
import { MesaFormComponent } from './mesa-form/mesa-form.component';
import { MesaIndexComponent } from './mesa-index/mesa-index.component';

const routes: Routes = [
  {path:'mesa', component: MesaIndexComponent,
  canActivate: [AuthGuard],
  data: {
    roles: ['ADMIN', 'MESERO'],
  },},
    
  {path:'mesa/all', component: MesaAllComponent,
  canActivate: [AuthGuard],
  data: {
    roles: ['ADMIN'],
  },},

  {path:'mesa/create', component: MesaFormComponent,
  canActivate: [AuthGuard],
  data: {
    roles: ['ADMIN'],
  },},

  {path:'mesa/:id', component: MesaDetailComponent,
  canActivate: [AuthGuard],
  data: {
    roles: ['ADMIN', 'MESERO'],
  },},

  {path:'mesa/rest/:id', component: MesaIndexComponent,
  canActivate: [AuthGuard],
  data: {
    roles: ['ADMIN', 'MESERO'],
  },},

  {path:'mesa/update/:id', component: MesaFormComponent,
  canActivate: [AuthGuard],
  data: {
    roles: ['ADMIN'],
  },},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MesaRoutingModule { }
