import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosDetailComponent } from './pedidos-detail/pedidos-detail.component';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';


const routes: Routes = [{ path: '', component: PedidosListComponent }, { path: ':id', component: PedidosDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
