import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../models/categoria.model';
import { ProdutoModel } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  public getAllProdutos(): Observable<ProdutoModel[]> {
    return this.http.get<ProdutoModel[]>(`${this.baseUrl}produtos`);
  }

  public getProduto(id: string): Observable<ProdutoModel> {
    return this.http.get<ProdutoModel>(`${this.baseUrl}produtos/${id}`);
  }

  public deleteProduto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}produtos/${id}`);
  }

  public updateProduto(produto: ProdutoModel): Observable<any> {
    let body = {
      "codigo": produto.codigo,
      "nome": produto.nome,
      "valor": produto.valor,
      "categoria": produto.categoria.id,
      "fornecedor": produto.fornecedor.id,
      "ativo": produto.ativo
    }
    return this.http.put(`${this.baseUrl}produtos/${produto.id}/`, body);
  }

  public addProduto(produto: ProdutoModel): Observable<any> {
    let body = {
      "codigo": produto.codigo,
      "nome": produto.nome,
      "valor": produto.valor,
      "categoria": produto.categoria.id,
      "fornecedor": produto.fornecedor.id,
      "ativo": produto.ativo
    }
    return this.http.post(`${this.baseUrl}produtos/`, body);
  }

  public getCategorias(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(`${this.baseUrl}categorias`);
  }
}
