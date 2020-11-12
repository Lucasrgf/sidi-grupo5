import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendedorModel } from '../models/vendedor.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient, public loginService: AuthService) {
   
  }

  public getAllVendedores(): Observable<VendedorModel[]> {
    return this.http.get<VendedorModel[]>(`${this.baseUrl}vendedores`);
  }

  public getVendedor(id: string): Observable<VendedorModel> {
    return this.http.get<VendedorModel>(`${this.baseUrl}vendedores/${id}`);
  }

  public deleteVendedor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}vendedores/${id}`);
  }

  public updateVendedor(vendedor: VendedorModel): Observable<any> {
    return this.http.put(`${this.baseUrl}vendedores/${vendedor.id}/`, vendedor);
  }

  public addVendedor(vendedor: VendedorModel): Observable<any> {
    return this.http.post(`${this.baseUrl}vendedores/`, vendedor);
  }

}
