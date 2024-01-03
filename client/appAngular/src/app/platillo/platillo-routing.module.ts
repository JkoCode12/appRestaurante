import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatilloAllComponent } from './platillo-all/platillo-all.component';
import { PlatilloDetailComponent } from './platillo-detail/platillo-detail.component';
import { PlatilloFormComponent } from './platillo-form/platillo-form.component';
import { PlatilloIndexComponent } from './platillo-index/platillo-index.component';

const routes: Routes = [

  {path:'platillo/all', component: PlatilloAllComponent},

  {path:'platillo/create', component: PlatilloFormComponent},
  {path:'platillo', component: PlatilloIndexComponent},
  {path:'platillo/:id', component: PlatilloDetailComponent},
  //Ruta solo de ejemplo detalle no se utiliza en la aplicacion
  {path:'platillo/update/:id', component: PlatilloFormComponent},
  



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatilloRoutingModule { }
