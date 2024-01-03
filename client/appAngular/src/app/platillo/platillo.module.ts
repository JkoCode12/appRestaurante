import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatilloRoutingModule } from './platillo-routing.module';
import { PlatilloIndexComponent } from './platillo-index/platillo-index.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatDialogModule} from "@angular/material/dialog";
import { PlatilloDetailComponent } from './platillo-detail/platillo-detail.component';
import { PlatilloAllComponent } from './platillo-all/platillo-all.component';
import { PlatilloFormComponent } from './platillo-form/platillo-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PlatilloIndexComponent,
    PlatilloAllComponent,
    PlatilloDetailComponent,
    PlatilloFormComponent
  ],
  imports: [
    CommonModule,
    PlatilloRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,

  ]
})
export class PlatilloModule { }
