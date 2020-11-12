import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaDetailComponent } from './categoria-detail/categoria-detail.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CategoriaComponent, CategoriaListComponent, CategoriaDetailComponent],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    SharedModule,
    MatSnackBarModule
  ]
})
export class CategoriaModule { }
