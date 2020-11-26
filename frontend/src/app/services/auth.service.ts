import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendedorService } from './vendedor.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:8000/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user: {
    username: string;
  }

  constructor(private http: HttpClient, private vendedorService: VendedorService) { }

  public login(username: string, password: string): Observable<{ token: string }> {
    let body = {
      username: username,
      password: password
    }
    return this.http.post<{ token: string }>(`${this.baseUrl}api/login`, body, { headers: this.headers });
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
  }

  public saveUser(username: string) {
    this.user = { username: username }
  }

  public getUser(): string{
    return this.user.username;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  saveVendedor(username: string){
    this.vendedorService.getAllVendedores().subscribe(data => {
      let vendedor = data.find(v => v.username == username)
      localStorage.setItem('vendedor',JSON.stringify(vendedor));
    })
  }
}
