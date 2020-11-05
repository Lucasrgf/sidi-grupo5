import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VendedorModel } from 'src/app/models/vendedor.model';
import { VendedorService } from 'src/app/services/vendedor.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-vendedor-list',
  templateUrl: './vendedor-list.component.html',
  styleUrls: ['./vendedor-list.component.scss']
})
export class VendedorListComponent implements OnInit {

  vendedores: VendedorModel[] = [];
  displayedColumns: string[] = ['id', 'nome', 'login', 'edit', 'delete'];

  constructor(
    private api: VendedorService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.api.getAllVendedores().subscribe(data => {
      this.vendedores = data;
    }, err => {
      console.error(err);
    });
  }

  addVendedor() {
    this.router.navigate(['/vendedor/novo']);
  }

  editVendedor(id: number) {
    this.router.navigate(['/vendedor', id]);
  }

  deleteVendedor(vendedor: VendedorModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { nome: vendedor.nome, title: 'Deletar Vendedor' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == 'yes'){
        this.api.deleteVendedor(vendedor.id).subscribe(data => {
          this.vendedores = this.vendedores.filter(v => v.id != vendedor.id);
        }, err =>{
          console.error(err);
        })
      }
    });
  }
}
