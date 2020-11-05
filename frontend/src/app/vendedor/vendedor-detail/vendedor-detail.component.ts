import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { VendedorModel } from 'src/app/models/vendedor.model';
import { VendedorService } from 'src/app/services/vendedor.service';
import { Location } from "@angular/common";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vendedor-detail',
  templateUrl: './vendedor-detail.component.html',
  styleUrls: ['./vendedor-detail.component.scss']
})
export class VendedorDetailComponent implements OnInit {

  vendedor: VendedorModel = new VendedorModel();
  isUpdate = false;
  constructor(private route: ActivatedRoute, private api: VendedorService, private location: Location, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      let id = param.get('id');
      console.log(id);
      if (id == 'novo') {
        this.isUpdate = false;
      } else {
        this.isUpdate = true;
        this.loadVendedor(id);
      }
    })
  }

  loadVendedor(id: string) {
    this.api.getVendedor(id).subscribe(data => {
      this.vendedor = data;
    }, err => {
      console.error(err);
    });
  }

  clickedButton(): void {
    if (this.isUpdate) {
      this.updateVendedor();
    } else {
      this.createVendedor();
    }
  }

  updateVendedor() {
    this.api.updateVendedor(this.vendedor).subscribe(data => {
      console.log(data);
      this.snackBar.open('Vendedor Atualizado!', '', {
        duration: 2000
      });
      this.back();
    }, err => {
      console.error(err);
    })
  }

  createVendedor() {
    this.api.addVendedor(this.vendedor).subscribe(data => {
      console.log(data);
      this.snackBar.open('Vendedor Criado!', '', {
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
