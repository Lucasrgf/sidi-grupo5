import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FornecedorModel } from 'src/app/models/fornecedor.model';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { Location } from "@angular/common";


@Component({
  selector: 'app-fornecedor-detail',
  templateUrl: './fornecedor-detail.component.html',
  styleUrls: ['./fornecedor-detail.component.scss']
})
export class FornecedorDetailComponent implements OnInit {

  fornecedor: FornecedorModel = new FornecedorModel();
  isUpdate = false;
  constructor(private api: FornecedorService, private route: ActivatedRoute, private location: Location, private snackBar: MatSnackBar) { }

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
    this.api.getFornecedor(id).subscribe(data => {
      this.fornecedor = data;
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
    this.api.updateFornecedor(this.fornecedor).subscribe(data => {
      console.log(data);
      this.snackBar.open('Fornecedor Atualizado!', '', {
        duration: 2000
      });
      this.back();
    }, err => {
      console.error(err);
    })
  }

  createFornecedor() {
    this.api.addFornecedor(this.fornecedor).subscribe(data => {
      console.log(data);
      this.snackBar.open('Fornecedor Criado!', '', {
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
