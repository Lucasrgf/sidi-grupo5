import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'vendedor', loadChildren: () => import('./vendedor/vendedor.module').then(m => m.VendedorModule) },
  { path: 'fornecedor', loadChildren: () => import('./fornecedor/fornecedor.module').then(m => m.FornecedorModule) },
  { path: 'produto', loadChildren: () => import('./produto/produto.module').then(m => m.ProdutoModule) },
  { path: 'categoria', loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
