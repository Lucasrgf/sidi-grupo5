import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaDetailComponent } from './categoria-detail/categoria-detail.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';

import { CategoriaComponent } from './categoria.component';

const routes: Routes = [{ path: '', component: CategoriaListComponent }, { path: ':id', component: CategoriaDetailComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
