import { Component, inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  tokenService = inject(TokenService);
  router = inject(Router);

  isLoggedIn() {
    return this.tokenService.getToken();
  }

  loginUser() {
    return this.router.navigate([ '/login' ]);
  }

  logoutUser() {
    this.tokenService.clearToken();
    this.router.navigate([ '/login' ]);
  }
}
