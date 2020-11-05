import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendedorRoutingModule } from './vendedor-routing.module';
import { VendedorComponent } from './vendedor.component';
import { VendedorListComponent } from './vendedor-list/vendedor-list.component';
import { VendedorDetailComponent } from './vendedor-detail/vendedor-detail.component';
import { VendedorService } from '../services/vendedor.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from "@angular/material/checkbox";
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [VendedorComponent, VendedorListComponent, VendedorDetailComponent],
  imports: [
    CommonModule,
    VendedorRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    SharedModule,
    MatSnackBarModule
  ],
  providers: [
    VendedorService
  ]
})
export class VendedorModule { }
