import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { VendedorService } from './services/vendedor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  opened = true;
  account = {
    name: 'John Doe'
  }

  constructor(private loginService: AuthService, private router: Router) { 
    this.account.name = localStorage.getItem('login');
  }

  logout(){
    this.loginService.logout();
  }

  login(){
    this.router.navigate(['login']);
  }
}
