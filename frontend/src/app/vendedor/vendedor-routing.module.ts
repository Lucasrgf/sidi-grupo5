import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendedorDetailComponent } from './vendedor-detail/vendedor-detail.component';
import { VendedorListComponent } from './vendedor-list/vendedor-list.component';

const routes: Routes = [{ path: '', component: VendedorListComponent }, { path: ':id', component: VendedorDetailComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendedorRoutingModule { }
