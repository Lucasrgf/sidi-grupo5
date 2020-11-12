import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:8000/';
  headers = new HttpHeaders().set('Content-Type', 'application/json' );

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<{token:string}>{
    let body = {
      username: username,
      password: password
    }
    return this.http.post<{token:string}>(`${this.baseUrl}api/login`, body, { headers: this.headers });
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('login');
  }
}
