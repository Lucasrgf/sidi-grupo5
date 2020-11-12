import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Location } from "@angular/common";


@Component({
  selector: 'app-categoria-detail',
  templateUrl: './categoria-detail.component.html',
  styleUrls: ['./categoria-detail.component.scss']
})
export class CategoriaDetailComponent implements OnInit {

  categoria: CategoriaModel = new CategoriaModel();
  isUpdate: boolean;
  constructor(private api: CategoriaService, private route: ActivatedRoute, private location: Location, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      let id = param.get('id');
      console.log(id);
      if (id == 'novo') {
        this.isUpdate = false;
      } else {
        this.isUpdate = true;
        this.loadFornecedor(id);
      }
    })
  }

  loadFornecedor(id: string) {
    this.api.getCategoria(id).subscribe(data => {
      this.categoria = data;
    }, err => {
      console.error(err);
    });
  }

  clickedButton(): void {
    if (this.isUpdate) {
      this.updateFornecedor();
    } else {
      this.createFornecedor();
    }
  }

  updateFornecedor() {
    this.api.updateCategoria(this.categoria).subscribe(data => {
      console.log(data);
      this.snackBar.open('Categoria Atualizada!', '', {
        duration: 2000
      });
      this.back();
    }, err => {
      console.error(err);
    })
  }

  createFornecedor() {
    this.api.addCategoria(this.categoria).subscribe(data => {
      console.log(data);
      this.snackBar.open('Categoria Criada!', '', {
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
