import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FornecedorModel } from '../models/fornecedor.model';
import { VendedorModel } from '../models/vendedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  
  baseUrl = 'http://localhost:8000/';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  public getAllFornecedores(): Observable<FornecedorModel[]> {
    return this.http.get<FornecedorModel[]>(`${this.baseUrl}fornecedores`, { headers: this.headers });
  }

  public getFornecedor(id: string): Observable<FornecedorModel> {
    return this.http.get<FornecedorModel>(`${this.baseUrl}fornecedores/${id}`, { headers: this.headers });
  }

  public deleteFornecedor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}fornecedores/${id}`, { headers: this.headers });
  }

  public updateFornecedor(vendedor: FornecedorModel): Observable<any> {
    return this.http.put(`${this.baseUrl}fornecedores/${vendedor.id}/`, vendedor, { headers: this.headers });
  }

  public addFornecedor(vendedor: FornecedorModel): Observable<any> {
    return this.http.post(`${this.baseUrl}fornecedores/`, vendedor, { headers: this.headers });
  }
}
