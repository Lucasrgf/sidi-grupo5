import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FornecedorDetailComponent } from './fornecedor-detail/fornecedor-detail.component';
import { FornecedorListComponent } from './fornecedor-list/fornecedor-list.component';

const routes: Routes = [{ path: '', component: FornecedorListComponent }, { path: ':id', component: FornecedorDetailComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
