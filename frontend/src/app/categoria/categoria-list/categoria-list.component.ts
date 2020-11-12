import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent implements OnInit {

  
  categorias: CategoriaModel[] = [];
  displayedColumns: string[] = ['id', 'nome', 'edit', 'delete'];
  constructor( private api: CategoriaService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.api.getAllCategorias().subscribe(data => {
      this.categorias = data;
    }, err => {
      console.error(err);
    });
  }

  addCategoria() {
    this.router.navigate(['/categoria/novo']);
  }

  editCategoria(id: number) {
    this.router.navigate(['/categoria', id]);
  }

  deleteCategoria(categoria: CategoriaModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { nome: categoria.nome, title: 'Deletar categoria' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == 'yes'){
        this.api.deleteCategoria(categoria.id).subscribe(data => {
          this.categorias = this.categorias.filter(v => v.id != categoria.id);
        }, err =>{
          console.error(err);
        })
      }
    });
  }
}
