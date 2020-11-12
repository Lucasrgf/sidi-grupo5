import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) {
   
  }

  public getAllCategorias(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(`${this.baseUrl}categorias`);
  }

  public getCategoria(id: string): Observable<CategoriaModel> {
    return this.http.get<CategoriaModel>(`${this.baseUrl}categorias/${id}`);
  }

  public deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}categorias/${id}`);
  }

  public updateCategoria(categoria: CategoriaModel): Observable<any> {
    return this.http.put(`${this.baseUrl}categorias/${categoria.id}/`, categoria);
  }

  public addCategoria(categoria: CategoriaModel): Observable<any> {
    return this.http.post(`${this.baseUrl}categorias/`, categoria);
  }
}
