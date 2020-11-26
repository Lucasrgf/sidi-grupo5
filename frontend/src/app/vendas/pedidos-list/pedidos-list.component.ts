import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PedidoModel } from 'src/app/models/pedido.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { VendedorService } from 'src/app/services/vendedor.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss']
})
export class PedidosListComponent implements OnInit {
  pedidos: PedidoModel[] = [];
  displayedColumns: string[] = ['id', 'status', 'data', 'vendedor', 'valor', 'forma_pagamento', 'edit', 'delete'];

  constructor( private api: PedidoService,
    private vendedorService: VendedorService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.api.getAllPedidos().subscribe(data => {
      this.pedidos = data; 
      this.getVendedor();
      this.getFormaPagamento();
    }, err => {
      console.error(err);
    });

  }

  getVendedor(){
    this.pedidos.forEach(p => {
      this.vendedorService.getVendedor(p.vendedor).subscribe(data => {
        p.vendedor_model = data;
      })
    });
  }

  getFormaPagamento(){
    this.pedidos.forEach(p => {
      this.api.getFormaPagamento(p.forma_pagamento).subscribe(data => {
        p.forma_pagamento = data;
      })
    });
  }

  addProduto() {
    this.router.navigate(['/vendas/novo']);
  }

  editProduto(id: number) {
    this.router.navigate(['/vendas', id]);
  }

  deletePedido(pedido: PedidoModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { nome: pedido.id, title: 'Deletar Pedido' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == 'yes'){
        this.api.deletePedido(pedido.id).subscribe(data => {
          this.pedidos = this.pedidos.filter(v => v.id != pedido.id);
        }, err =>{
          console.error(err);
        })
      }
    });
  }
}
