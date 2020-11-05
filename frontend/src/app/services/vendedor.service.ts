import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendedorModel } from '../models/vendedor.model';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  baseUrl = 'http://localhost:8000/';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  public getAllVendedores(): Observable<VendedorModel[]> {
    return this.http.get<VendedorModel[]>(`${this.baseUrl}vendedores`, { headers: this.headers });
  }

  public getVendedor(id: string): Observable<VendedorModel> {
    return this.http.get<VendedorModel>(`${this.baseUrl}vendedores/${id}`, { headers: this.headers });
  }

  public deleteVendedor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}vendedores/${id}`, { headers: this.headers });
  }

  public updateVendedor(vendedor: VendedorModel): Observable<any> {
    return this.http.put(`${this.baseUrl}vendedores/${vendedor.id}/`, vendedor, { headers: this.headers });
  }

  public addVendedor(vendedor: VendedorModel): Observable<any> {
    return this.http.post(`${this.baseUrl}vendedores/`, vendedor, { headers: this.headers });
  }
  
  
}
