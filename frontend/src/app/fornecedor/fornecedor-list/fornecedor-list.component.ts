import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FornecedorModel } from 'src/app/models/fornecedor.model';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.scss']
})
export class FornecedorListComponent implements OnInit {

  fornecedores: FornecedorModel[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cnpj-cpf', 'edit', 'delete'];

  constructor( private api: FornecedorService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.api.getAllFornecedores().subscribe(data => {
      this.fornecedores = data;
    }, err => {
      console.error(err);
    });
  }

  
  addFornecedor() {
    this.router.navigate(['/fornecedor/novo']);
  }

  editFornecedor(id: number) {
    this.router.navigate(['/fornecedor', id]);
  }

  deleteFornecedor(fornecedor: FornecedorModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { nome: fornecedor.nome_fantasia, title: 'Deletar Fornecedor' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == 'yes'){
        this.api.deleteFornecedor(fornecedor.id).subscribe(data => {
          this.fornecedores = this.fornecedores.filter(v => v.id != fornecedor.id);
        }, err =>{
          console.error(err);
        })
      }
    });
  }
}
