import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProdutoModel } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit {

  produtos: ProdutoModel[] = [];
  displayedColumns: string[] = ['id', 'codigo', 'nome', 'valor', 'edit', 'delete'];

  constructor( private api: ProdutoService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.api.getAllProdutos().subscribe(data => {
      this.produtos = data;
    }, err => {
      console.error(err);
    });
  }

  
  addProduto() {
    this.router.navigate(['/produto/novo']);
  }

  editProduto(id: number) {
    this.router.navigate(['/produto', id]);
  }

  deleteVendedor(produto: ProdutoModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { nome: produto.nome, title: 'Deletar Produto' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == 'yes'){
        this.api.deleteProduto(produto.id).subscribe(data => {
          this.produtos = this.produtos.filter(v => v.id != produto.id);
        }, err =>{
          console.error(err);
        })
      }
    });
  }
}
