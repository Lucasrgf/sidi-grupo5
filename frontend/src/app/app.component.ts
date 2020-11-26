import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  opened = true;
  account = {
    name: ''
  }

  isLogged = false;

  constructor(private loginService: AuthService, private router: Router) { 
  }

  logout(){
    this.opened = false;
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
