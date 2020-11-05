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
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  public getAllProdutos(): Observable<ProdutoModel[]> {
    return this.http.get<ProdutoModel[]>(`${this.baseUrl}produtos`, { headers: this.headers });
  }

  public getProduto(id: string): Observable<ProdutoModel> {
    return this.http.get<ProdutoModel>(`${this.baseUrl}produtos/${id}`, { headers: this.headers });
  }

  public deleteProduto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}produtos/${id}`, { headers: this.headers });
  }

  public updateProduto(produto: ProdutoModel): Observable<any> {
    return this.http.put(`${this.baseUrl}produtos/${produto.id}/`, produto, { headers: this.headers });
  }

  public addProduto(produto: ProdutoModel): Observable<any> {
    let body = {
      "codigo": produto.codigo,
      "nome": produto.nome,
      "valor": produto.valor,
      "categoria": {
          "nome": produto.categoria.nome
      },
      "fornecedor": {
          "cnpj_cpf": produto.fornecedor.cnpj_cpf,
          "nome_fantasia": produto.fornecedor.nome_fantasia,
          "ativo": produto.fornecedor.ativo
      },
      "ativo": produto.ativo
  }
    return this.http.post(`${this.baseUrl}produtos/`, body, { headers: this.headers });
  }

  public getCategorias(): Observable<CategoriaModel[]>{
    return this.http.get<CategoriaModel[]>(`${this.baseUrl}categorias`, { headers: this.headers });
  }
}
