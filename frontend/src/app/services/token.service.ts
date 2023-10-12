import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token: String = '';

  constructor() { }

  cookieService = inject(CookieService);
  route = inject(Router);


  fetchTokenFromCookie() {
    if (this.cookieService.check('token')) {
      const userToken = this.cookieService.get('token');
      this.token = userToken;
    } else {
      // redundant but just to be on safe side
      this.token = '';
      this.route.navigate(['/login']);
    }
  }

  getToken() {
    if (!this.token) {
      if(this.cookieService.check('token')){
        const userToken = this.cookieService.get('token');
        this.token = userToken;
      }
    }
    return this.token;
  }

  getParsedTokenData() {
    if (!this.token) {
      this.fetchTokenFromCookie()
      return {};
    } else {
      let payload = this.token.split('.')[1];
      payload = payload.replace(/-/g, '+').replace(/_/g, '/');
      payload = decodeURIComponent(window.atob(payload).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      payload = JSON.parse(payload);
      return payload;
    }
  }

  saveToken(token: string) {
    this.token = token;
    this.cookieService.set('token', token);
  }
}
