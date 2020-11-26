import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoModel } from '../models/pedido.model';
import { ProdutoPedidoModel } from '../models/produto-pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getAllPedidos(): Observable<PedidoModel[]> {
    return this.http.get<PedidoModel[]>(`${this.baseUrl}pedidos`);
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}pedidos/${id}`);
  }

  getAllFormaPagamento(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}forma-pagamento`);
  }

  getFormaPagamento(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}forma-pagamento/${id}`);
  }

  getPedido(id: number): Observable<PedidoModel> {
    return this.http.get<PedidoModel>(`${this.baseUrl}pedidos/${id}`);
  }

  public updatePedido(pedido: PedidoModel): Observable<any> {
    return this.http.put(`${this.baseUrl}pedidos/${pedido.id}/`, pedido);
  }

  public updateProdutoPedido(produtoPedido: ProdutoPedidoModel): Observable<any>{
    console.log("produto pedido ", produtoPedido);
    return this.http.put(`${this.baseUrl}produto-pedido/${produtoPedido.id}/`, produtoPedido);
  }

  public addPedido(pedido: PedidoModel): Observable<any> {
    let date = new Date();
    console.log(pedido);
    let body = {
      valor: +(pedido.valor.replace('R$ ', '').replace(',', '.')),
      data: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      status: pedido.status,
      forma_pagamento: pedido.forma_pagamento_model.id,
      vendedor: pedido.vendedor_model.id
    }
    return this.http.post(`${this.baseUrl}pedidos/`, body);
  }

  public addProdutoPedido(produtoPedido: ProdutoPedidoModel): Observable<any>{
    return this.http.post(`${this.baseUrl}produto-pedido/`, produtoPedido);
  }

  public getAllProdutoPedido(): Observable<any>{
    return this.http.get(`${this.baseUrl}produto-pedido/`);
  }
}
