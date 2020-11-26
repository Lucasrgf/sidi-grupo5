import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { VendedorService } from '../services/vendedor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  constructor(public loginService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.username && this.password) {
      this.loginService.login(this.username, this.password).subscribe(data => {
        localStorage.setItem('token', data.token);
        this.loginService.saveVendedor(this.username);
        this.loginService.saveUser(this.username);
        setTimeout(() => this.router.navigate(['/vendas']), 1000);
        console.log('...');
      }, err => {
        console.error(err);
      })
    }
  }


}
