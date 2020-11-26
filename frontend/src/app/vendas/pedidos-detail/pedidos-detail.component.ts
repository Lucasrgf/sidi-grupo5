import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FornecedorModel } from 'src/app/models/fornecedor.model';
import { PedidoModel } from 'src/app/models/pedido.model';
import { Location } from "@angular/common";
import { PedidoService } from 'src/app/services/pedido.service';
import { VendedorModel } from 'src/app/models/vendedor.model';
import { ProdutoModel } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { ProdutoPedidoModel } from 'src/app/models/produto-pedido.model';
import { VendedorService } from 'src/app/services/vendedor.service';

@Component({
  selector: 'app-pedidos-detail',
  templateUrl: './pedidos-detail.component.html',
  styleUrls: ['./pedidos-detail.component.scss']
})
export class PedidosDetailComponent implements OnInit {
  pedido: PedidoModel = new PedidoModel();
  displayedColumns: string[] = ['codigo', 'nome', 'valor', 'parcial', 'qtd'];
  produtoPedidos: ProdutoPedidoModel[] = [];
  produtos: ProdutoModel[];
  isUpdate = false;
  formaPagamentos: {
    id: number;
    descricao: string;
  }[] = [];
  fornecedores: FornecedorModel[] = [];

  constructor(private api: PedidoService, private route: ActivatedRoute, private location: Location, private snackBar: MatSnackBar, private produtoService: ProdutoService, private vendedorService: VendedorService) { }

  ngOnInit(): void {
    this.loadFormaPagamento();
    this.pedido.vendedor_model = new VendedorModel();

    console.log(this.pedido);
    this.loadProdutos();
    this.route.paramMap.subscribe((param: ParamMap) => {
      let id = param.get('id');
      if (id == 'novo') {
        this.isUpdate = false;
        this.pedido.valor = 'R$ 0,00';
        let storage = localStorage.getItem('vendedor');
        this.pedido.vendedor = JSON.parse(storage);
      } else {
        this.isUpdate = true;
        this.loadPedido(+id);
      }
    })
  }

  loadProdutos() {
    this.produtoService.getAllProdutos().subscribe(data => {
      this.produtos = data;
    })
  }

  loadFormaPagamento() {
    this.api.getAllFormaPagamento().subscribe(data => {
      this.formaPagamentos = data;
    }, err => {
      console.error(err);
    })
  }

  loadVendedor(id: string) {
    this.vendedorService.getVendedor(id).subscribe(data => {
      this.pedido.vendedor_model = data;
    })
  }

  loadProdutoPedido(id: number) {
    this.api.getAllProdutoPedido().subscribe(data => {
      let prod_ped = data.filter(d => d.pedido == id);
      this.produtos.forEach(p => {
        let prod = prod_ped.find(pp => pp.produto == p.id);
        if (prod) {
          p.qtd = prod.qtd_produto;
          p.valorParcial = +prod.valor_parcial;
        }
      });
      this.produtoPedidos = prod_ped;
      this.calculateTotal();

    })
  }

  loadPedido(id: number) {
    this.api.getPedido(id).subscribe(data => {
      this.pedido.data = data.data;
      this.pedido.forma_pagamento = data.forma_pagamento;
      this.pedido.id = data.id;
      this.pedido.status = data.status;
      this.pedido.valor = data.valor;
      this.pedido.vendedor = data.vendedor;
      this.pedido.forma_pagamento_model = this.formaPagamentos.find(c => c.id == this.pedido.forma_pagamento);
      console.log(this.formaPagamentos);
      console.log(this.pedido);
      this.loadVendedor(this.pedido.vendedor);
      this.loadProdutoPedido(id);
      console.log(this.pedido);
    }, err => {
      console.error(err);
    });
  }

  clickedButton(): void {

    if (this.isUpdate) {
      this.updatePedido();
    } else {
      this.createPedido();
    }
  }

  updatePedido() {
    this.api.updatePedido(this.pedido).subscribe(data => {
      this.snackBar.open('Pedido Atualizado!', '', {
        duration: 2000
      });
      this.updateProdutoPedido();
      this.back();
    }, err => {
      console.error(err);
    })
  }

  updateProdutoPedido(){
    this.produtoPedidos.forEach(p => {
      if(p.new){
        console.log('is new');
        p.pedido = this.pedido.id;
        this.api.addProdutoPedido(p).subscribe(data => {
          console.log(data);
        }, err => {
          console.error(err);
        });
      } else {
        this.api.updateProdutoPedido(p).subscribe(data => {
          console.log(data);
        }, err => {
          console.error(err);
        })
      }
    });
  }

  createPedido() {
    this.api.addPedido(this.pedido).subscribe(data => {
      this.addProdutosPedido(data.id)
      this.snackBar.open('Pedido Criado!', '', {
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

  addProduto(produto: ProdutoModel) {
    produto.valorParcial = +produto.valor * produto.qtd;
    let p = this.produtoPedidos.find(p => p.produto == produto.id);
    if (p == undefined) {
      let produtoPedido = new ProdutoPedidoModel();
      produtoPedido.produto = produto.id;
      produtoPedido.qtd_produto = produto.qtd;
      produtoPedido.valor_parcial = produto.valorParcial.toFixed(2);
      this.produtoPedidos.push(produtoPedido);
    } else {
      p.qtd_produto = produto.qtd;
      p.valor_parcial = produto.valorParcial.toFixed(2);
    }
    this.calculateTotal();
  }

  calculateTotal() {
    let valor = 0;
    console.log(this.produtoPedidos);
    this.produtoPedidos.forEach(p => {
      valor += +p.valor_parcial;
    });
    this.pedido.valor = valor.toFixed(2);
  }

  addProdutosPedido(id: number) {
    this.produtoPedidos.forEach(p => {
      p.pedido = id;
      this.api.addProdutoPedido(p).subscribe(data => {
        console.log(data);
      }, err => {
        console.error(err);
      });
    });
  }
}
