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

  constructor(private http: HttpClient) { }

  public getAllFornecedores(): Observable<FornecedorModel[]> {
    return this.http.get<FornecedorModel[]>(`${this.baseUrl}fornecedores`);
  }

  public getFornecedor(id: string): Observable<FornecedorModel> {
    return this.http.get<FornecedorModel>(`${this.baseUrl}fornecedores/${id}`);
  }

  public deleteFornecedor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}fornecedores/${id}`);
  }

  public updateFornecedor(fornecedor: FornecedorModel): Observable<any> {
    return this.http.put(`${this.baseUrl}fornecedores/${fornecedor.id}/`, fornecedor);
  }

  public addFornecedor(fornecedor: FornecedorModel): Observable<any> {
    return this.http.post(`${this.baseUrl}fornecedores/`, fornecedor);
  }
}
