import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'vendedor', loadChildren: () => import('./vendedor/vendedor.module').then(m => m.VendedorModule), canActivate: [AuthGuard]  },
  { path: 'fornecedor', loadChildren: () => import('./fornecedor/fornecedor.module').then(m => m.FornecedorModule), canActivate: [AuthGuard]  },
  { path: 'produto', loadChildren: () => import('./produto/produto.module').then(m => m.ProdutoModule), canActivate: [AuthGuard]  },
  { path: 'categoria', loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule), canActivate: [AuthGuard]  },
  { path: 'vendas', loadChildren: () => import('./vendas/vendas.module').then(m => m.VendasModule), canActivate: [AuthGuard]  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
