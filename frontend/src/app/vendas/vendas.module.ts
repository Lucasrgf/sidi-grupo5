import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendasRoutingModule } from './vendas-routing.module';
import { VendasComponent } from './vendas.component';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { PedidosDetailComponent } from './pedidos-detail/pedidos-detail.component';


@NgModule({
  declarations: [VendasComponent, PedidosListComponent, PedidosDetailComponent],
  imports: [
    CommonModule,
    VendasRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    SharedModule,
    MatSnackBarModule,
    MatSelectModule
  ]
})
export class VendasModule { }
