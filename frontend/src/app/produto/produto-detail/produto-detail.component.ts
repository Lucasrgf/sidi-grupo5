import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProdutoModel } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { Location } from "@angular/common";
import { CategoriaModel } from 'src/app/models/categoria.model';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { FornecedorModel } from 'src/app/models/fornecedor.model';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.scss']
})
export class ProdutoDetailComponent implements OnInit {

  produto: ProdutoModel = new ProdutoModel();
  isUpdate = false;
  categorias: CategoriaModel[] = [];
  fornecedores: FornecedorModel[] = [];

  constructor(private api: ProdutoService, private fornecedoresApi: FornecedorService, private route: ActivatedRoute, private location: Location, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      let id = param.get('id');
      console.log(id);
      if (id == 'novo') {
        this.isUpdate = false;
      } else {
        this.isUpdate = true;
        this.loadProduto(id);
      }
    })
    this.loadCategorias();
    this.loadFornecedores();
  }

  loadCategorias(){
    this.api.getCategorias().subscribe(data => {
      this.categorias = data;
    }, err => {
      console.error(err);
    })
  }

  loadFornecedores(){
    this.fornecedoresApi.getAllFornecedores().subscribe(data => {
      this.fornecedores = data;
    }, err => {
      console.error(err);
    }) 
  }

  loadProduto(id: string) {
    this.api.getProduto(id).subscribe(data => {
      this.produto = data;
    }, err => {
      console.error(err);
    });
  }

  clickedButton(): void {
    if (this.isUpdate) {
      this.updateProduto();
    } else {
      this.createProduto();
    }
  }

  updateProduto() {
    this.api.updateProduto(this.produto).subscribe(data => {
      console.log(data);
      this.snackBar.open('Produto Atualizado!', '', {
        duration: 2000
      });
      this.back();
    }, err => {
      console.error(err);
    })
  }

  createProduto() {
    this.api.addProduto(this.produto).subscribe(data => {
      console.log(data);
      this.snackBar.open('Produto Criado!', '', {
        duration: 2000
      });
      this.back();
    }, err => {
      console.error(err);
    })
  }

  back() {
    this.location.back();
  }
}
